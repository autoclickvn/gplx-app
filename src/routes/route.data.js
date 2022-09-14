import Home from 'screens/home';
import ReviewQuestion from 'screens/review-question';
import TrafficSignDetail from 'screens/traffic-sign-detail';
import TrafficSigns from 'screens/traffic-signs';

export const HOME_ROUTES = [
  {
    name: 'Home',
    component: Home,
  },
];

// ví dụ màn Home có ô Các biển báo, thì tất cả các screen nằm trong đấy sẽ khai báo ở đây
export const TRAFFIC_SIGNS_ROUTES = [
  {
    name: 'TrafficSigns',
    component: TrafficSigns,
  },
  {
    name: 'TrafficSignDetail',
    component: TrafficSignDetail,
  },
]

// ví dụ màn Home có ô Ôn tập câu hỏi, thì tất cả các screen nằm trong đấy sẽ khai báo ở đây
export const REVIEW_QUESTION_ROUTES = [
  {
    name: 'ReviewQuestion',
    component: ReviewQuestion,
  },
]