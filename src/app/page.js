import Banner from "./components/Banner";
import PopularCourses from "./components/PopularCourses";
import TrendingCourses from "./components/TrendingCourses";

export default function Home() {
  return (
    <>
      <Banner />
      <PopularCourses />
      <TrendingCourses />
    </>
  );
}
