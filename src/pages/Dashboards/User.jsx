import "../../styles/dashboard.css";
export default function User() {
  return <Dashboard />;
}

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="sidebar"></div>
      <div className="content">
        <div className="content--header"></div>
        <div className="content--body"></div>
      </div>
    </div>
  );
}
