import DashboardLayout from "../components/DashboardLayout";

export default function Dashboard({ dashboardComponent }) {
    return <>{dashboardComponent.component}</>;
}

Dashboard.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
