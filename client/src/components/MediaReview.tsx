import reviewApis from "lib/api/modules/review.api";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";
import { Props } from "./MediaReview.type";
import useMultipleState from "hooks/useMultipleState";
import { toast } from "react-toastify";
import dayjs from "dayjs";

import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Container from "components/Container";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Review } from "types/index.types";
import TextAvatar from "./TextAvatar";

const ReviewItem = ({
  review,
  onRemoved,
}: {
  review: any;
  onRemoved: (id: string | number) => void;
}) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [onRequest, setOnRequest] = React.useState<boolean>(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const { response, error } = await reviewApis.remove({
      reviewId: review.id,
    });
    if (error) toast.error(error.message);
    if (response) onRemoved(review.id);
  };

  return (
    <Box
      sx={{
        padding: 2,
        borderRadius: "5px",
        position: "relative",
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Stack direction="row" spacing={2}>
        {/* 유저 아바타 */}
        <TextAvatar text={review.user?.displayName} />
        {/* 유저 아바타 */}
        <Stack spacing={2} flexGrow={1}>
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight="700">
              {review.user?.displayName}
            </Typography>
            <Typography variant="caption">
              {dayjs(review.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            </Typography>
          </Stack>
          <Typography variant="body1" textAlign="justify">
            {review.content}
          </Typography>
          {user && user.id === review.user.id && (
            <LoadingButton
              variant="contained"
              startIcon={<DeleteIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onRemove}
              sx={{
                position: { xs: "relative", md: "absolute" },
                right: { xs: 0, md: "10px" },
                marginTop: { xs: 2, md: 0 },
                width: "max-content",
              }}
            >
              삭제하기
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

enum STATE_NAMES {
  listReviews = "listReviews",
  filteredReviews = "filteredReviews",
  page = "page",
  onRequest = "onRequest",
  content = "content",
  reviewCount = "reviewCount",
}

const MediaReview = ({
  reviews,
  media,
  mediaType,
}: React.PropsWithChildren<Props>) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [
    { listReviews, filteredReviews, page, onRequest, content, reviewCount },
    setReviewState,
  ] = useMultipleState({
    listReviews: [] as Review[],
    filteredReviews: [] as Review[],
    page: 1,
    onRequest: false,
    content: "",
    reviewCount: 0,
  });

  const skip = 4;

  const onUnmount = React.useCallback((reviews: any) => {
    const count = reviews?.length;
    setReviewState({
      name: STATE_NAMES.listReviews,
      value: reviews,
    });
    setReviewState({
      name: STATE_NAMES.filteredReviews,
      value: reviews?.splice(0, skip),
    });
    setReviewState({
      name: STATE_NAMES.reviewCount,
      value: count,
    });
  }, []);

  React.useEffect(() => {
    onUnmount(reviews);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setReviewState({
      name: STATE_NAMES.onRequest,
      value: true,
    });

    const body = {
      content: content as string,
      mediaId: media.id,
      mediaType,
      mediaTitle: (media.title || media.name)!,
      mediaPoster: media.poster_path!,
    };

    const { response, error } = await reviewApis.add(body);

    setReviewState({
      name: STATE_NAMES.onRequest,
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      toast.success("리뷰 작성에 성공하였습니다.");
    }

    setReviewState({
      name: STATE_NAMES.filteredReviews,
      value: [...filteredReviews, response],
    });

    setReviewState({
      name: STATE_NAMES.reviewCount,
      value: reviewCount + 1,
    });
    setReviewState({
      name: STATE_NAMES.content,
      value: "",
    });
  };

  const onLoadMore = () => {
    const newPage = page * skip;
    const snapshot = [...listReviews]?.splice(newPage, skip);
    setReviewState({
      name: "filteredReviews",
      value: [...filteredReviews, ...snapshot],
    });
    setReviewState({
      name: "page",
      value: page + 1,
    });
  };

  const onRemoved = (id: string | number) => {
    const newPage = page * skip;

    const targetIndex = listReviews?.findIndex((e: Review) => e.id === id);
    const newListReviews = [...listReviews].filter((e) => e.id !== id);

    if (targetIndex !== -1) {
      setReviewState({
        name: STATE_NAMES.listReviews,
        value: newListReviews,
      });
      setReviewState({
        name: STATE_NAMES.filteredReviews,
        value: [...newListReviews].splice(0, newPage),
      });
    } else {
      setReviewState({
        name: STATE_NAMES.filteredReviews,
        value: [...filteredReviews].filter((e) => e.id !== id),
      });
    }

    setReviewState({
      name: "reviewCount",
      value: reviewCount - 1,
    });

    toast.success("리뷰 삭제를 성공하였습니다.");
  };

  return (
    <>
      <Container header={`댓글 (${reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews?.map((item: Review) =>
            item.user ? (
              <Box key={item.id}>
                <ReviewItem review={item} onRemoved={onRemoved} />
                <Divider
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>
            ) : null
          )}
          {filteredReviews?.length < listReviews?.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              {/* 유저 아바타 */}
              <TextAvatar text={user.displayName} />
              {/* 유저 아바타 */}

              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  value={content}
                  onChange={(e) =>
                    setReviewState({
                      name: STATE_NAMES.content,
                      value: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                  placeholder="Write your review"
                  variant="outlined"
                />
                <LoadingButton
                  variant="contained"
                  size="large"
                  sx={{ width: "max-content" }}
                  startIcon={<SendOutlinedIcon />}
                  loadingPosition="start"
                  loading={onRequest}
                  onClick={onAddReview}
                >
                  확인
                </LoadingButton>
              </Stack>
            </Stack>
          </>
        )}
      </Container>
    </>
  );
};
export default MediaReview;
