import React from "react";
import { pageRouters } from "routes/router";
import { useDispatch } from "react-redux";
import { setGlobalLoading } from "redux/features/globalLoadingSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import uiConfigs from "configs/ui.config";

import useMultipleState from "hooks/useMultipleState";
import tmdbConfig from "lib/api/config/tmdb.config";
import reviewApis from "lib/api/modules/review.api";

import Container from "components/Container";
import { LoadingButton } from "@mui/lab";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Button, Divider, Stack, Typography } from "@mui/material";

const ReviewItem = ({ review, onRemoved }: { review: any; onRemoved: any }) => {
  const [onRequest, setOnRequest] = React.useState<boolean>(false);

  const onRemove = async () => {
    if (onRequest) return; // 요청 중일 때,
    setOnRequest(true);
    const { response, error } = await reviewApis.remove({
      reviewId: review.id!,
    });
    setOnRequest(false); // 요청 완료

    if (error) toast.error(error.message);
    if (response) {
      toast.success("리뷰가 삭제 되었습니다.");
      onRemoved(review.id);
    }
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 1,
          opacity: onRequest ? 0.6 : 1,
          "&:hover": { backgroundColor: "background.paper" },
        }}
      >
        <Box sx={{ width: { xs: 0, md: "10%" } }}>
          <Link
            to={pageRouters.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Box
              sx={{
                paddingTop: "160%",
                ...uiConfigs.style.backgroundImage(
                  tmdbConfig.posterPath(review.mediaPoster)
                ),
              }}
            />
          </Link>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "80%" },
            padding: { xs: 0, md: "0 2rem" },
          }}
        >
          <Stack spacing={1}>
            <Link
              to={pageRouters.mediaDetail(review.mediaType, review.mediaId)}
              style={{ color: "unset", textDecoration: "none" }}
            >
              <Typography
                variant="h6"
                sx={{ ...uiConfigs.style.typoLines(1, "left") }}
              >
                {review.mediaTitle}
              </Typography>
            </Link>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
            <Typography>{review.content}</Typography>
          </Stack>
        </Box>

        <LoadingButton
          variant="contained"
          sx={{
            position: { xs: "relative", md: "absolute" },
            right: { xs: 0, md: "10px" },
            marginTop: { xs: 2, md: 0 },
            width: "max-content",
          }}
          startIcon={<DeleteIcon />}
          loadingPosition="start"
          loading={onRequest}
          onClick={onRemove}
        >
          삭제하기
        </LoadingButton>
      </Box>
    </>
  );
};

enum STATE_NAMES {
  reviews = "reviews",
  filteredReviews = "filteredReviews",
  page = "page",
  count = "count",
}

const ReviewList = () => {
  const [{ reviews, filteredReviews, page, count }, setReviewState] =
    useMultipleState({
      reviews: [],
      filteredReviews: [],
      page: 1,
      count: 0,
    });

  const dispatch = useDispatch();
  const skip = 2;

  React.useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true));
      const { response, error } = await reviewApis.getList();
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);
      if (response) {
        setReviewState({ name: STATE_NAMES.count, value: response.length });
        setReviewState({ name: STATE_NAMES.reviews, value: [...response] });
        setReviewState({
          name: STATE_NAMES.filteredReviews,
          value: [...response].splice(0, skip),
        });
      }
    };
    getReviews();
  }, []);

  const onLoadMore = () => {
    setReviewState({
      name: STATE_NAMES.filteredReviews,
      value: [...filteredReviews, ...[...reviews].splice(page * skip, skip)],
    });

    setReviewState({ name: STATE_NAMES.page, value: page + 1 });
  };

  const onRemoved = (id: number) => {
    const newReviews = [...reviews].filter((e) => e.id !== id);
    setReviewState({ name: STATE_NAMES.reviews, value: newReviews });
    setReviewState({
      name: STATE_NAMES.filteredReviews,
      value: [...newReviews].splice(0, page * skip),
    });

    setReviewState({ name: STATE_NAMES.count, value: count - 1 });
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`나의 리뷰작성 (${count})`}>
        <Stack spacing={2}>
          {filteredReviews.map((item: any) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}
          {filteredReviews.length < reviews.length && (
            <Button onClick={onLoadMore}>더보기</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
export default ReviewList;
