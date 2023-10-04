import Feed from "../components/feed";
import Rightbar from "../components/rightbar";
import Topbar from "../components/topbar";

const Home = () => {
  return (
    <>
      <Topbar />
      <div style={{ marginTop: "90px" }} className="homeContainer">
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
