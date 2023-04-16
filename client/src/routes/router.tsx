import FavoriteList from "pages/FavoriteList";
import Home from "pages/Home";
import MediaDetail from "pages/MediaDetail";
import MediaList from "pages/MediaList";
import MediaSearch from "pages/MediaSearch";
import PasswordUpdate from "pages/PasswordUpdate";
import PersonDetail from "pages/PersonDetail";
import ReviewList from "pages/ReviewList";

export const pageRouters = {
  home: "/",
  mediaList: (type: "tv" | "movie" | "person") => `/${type}`,
  mediaDetail: (type: "tv" | "movie" | "person", id: string) =>
    `/${type}/${id}`,
  mediaSearch: "/search",
  person: (id: string) => `/person/${id}`,
  favoriteList: `/favorites`,
  reviewList: `/reviews`,
  passwordUpdate: "password-update",
};

const routes = [
  {
    index: true,
    element: <Home />,
    state: "home",
  },
  {
    path: "/person/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  {
    path: "/search",
    element: <MediaSearch />,
    state: "search",
  },
  {
    path: "/password-update",
    element: <PasswordUpdate />,
    state: "password.update",
  },
  {
    path: "/favorites",
    element: <FavoriteList />,
    state: "favorites",
  },
  {
    path: "/reviews",
    element: <ReviewList />,
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/:mediaId",
    element: <MediaDetail />,
  },
];
export default routes;
