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

const ReviewItem = ({ review, onRemoved }: { review: any; onRemoved: any }) => {
  const { user } = useSelector((state: RootState) => state.user);
  const [onRequest, setOnRequest] = React.useState<boolean>(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);

    // const {response, error}=await reviewApis.remove({})
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
        {/* avatar */}
        {/* <TextAvatar text={review.user?.displayName} /> */}
        {/* avatar */}
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
              remove
            </LoadingButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

const MediaReview = ({
  reviews,
  media,
  mediaType,
}: React.PropsWithChildren<Props>) => {
  const { user } = useSelector((state: RootState) => state.user);

  const [reviewState, setReviewState] = useMultipleState({
    listReviews: [],
    filteredReviews: [],
    page: 1,
    onRequest: false,
    content: "",
    reviewCount: 0,
  });

  const skip = 4;

  React.useEffect(() => {
    setReviewState({
      name: "listReviews",
      value: reviews,
    });
    setReviewState({
      name: "filteredReviews",
      value: reviews?.splice(0, skip),
    });
    setReviewState({
      name: "reviewCount",
      value: reviews?.length,
    });
  }, [reviews]);

  const onAddReview = async () => {
    if (reviewState.onRequest) return;
    setReviewState({
      name: "onRequest",
      value: true,
    });

    const body = {
      content: reviewState.content as string,
      mediaId: media.id,
      mediaType,
      mediaTitle: (media.title || media.name)!,
      mediaPoster: media.poster_path!,
    };

    const { response, error } = await reviewApis.add(body);

    setReviewState({
      name: "onRequest",
      value: false,
    });

    if (error) toast.error(error.message);
    if (response) {
      toast.success("리뷰 작성에 성공하였습니다.");
    }

    setReviewState({
      name: "filteredReviews",
      value: [...reviewState.filteredReviews, response],
    });

    setReviewState({
      name: "reviewCount",
      value: reviewState.reviewCount + 1,
    });
    setReviewState({
      name: "content",
      value: "",
    });
  };

  const onLoadMore = () => {
    const newPage = reviewState.page * skip;
    const snapshot = [...reviewState.listReviews]?.splice(newPage, skip);
    setReviewState({
      name: "filteredReviews",
      value: [...reviewState.filteredReviews, ...snapshot],
    });
    setReviewState({
      name: "page",
      value: reviewState.page + 1,
    });
  };

  const onRemoved = (id: number) => {
    const newPage = reviewState.page * skip;

    const targetIndex = reviewState.listReview.findIndex(
      (e: any) => e.id === id
    );
    const newListReviews = [...reviewState.listReviews].filter(
      (e) => e.id !== id
    );

    if (targetIndex < -1) {
      setReviewState({
        name: "filteredReviews",
        value: [...reviewState.filteredReviews].filter((e) => e.id !== id),
      });
    } else {
      setReviewState({
        name: "listReviews",
        value: newListReviews,
      });
      setReviewState({
        name: "filteredReviews",
        value: [...newListReviews].splice(0, newPage),
      });
    }

    setReviewState({
      name: "reviewCount",
      value: reviewState.reviewCount - 1,
    });

    toast.success("리뷰 삭제를 성공하였습니다.");
  };
  return (
    <>
      <Container header={`Reviews (${reviewState.reviewCount})`}>
        <Stack spacing={4} marginBottom={2}>
          {reviewState.filteredReviews?.map((item: any) =>
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
          {reviewState.filteredReviews?.length <
            reviewState.listReviews?.length && (
            <Button onClick={onLoadMore}>load more</Button>
          )}
        </Stack>
        {user && (
          <>
            <Divider />
            <Stack direction="row" spacing={2}>
              {/* <TextAvatar text={user.displayName} /> */}
              <Stack spacing={2} flexGrow={1}>
                <Typography variant="h6" fontWeight="700">
                  {user.displayName}
                </Typography>
                <TextField
                  value={reviewState.content}
                  onChange={(e) =>
                    setReviewState({
                      name: "content",
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
                  loading={reviewState.onRequest}
                  onClick={onAddReview}
                >
                  post
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
