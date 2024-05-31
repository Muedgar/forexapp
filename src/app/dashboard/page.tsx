import Card from "@/components/cards/card";
import BarChart from "@/components/charts/BarChart";
import Table from "@/components/tables/table";


export default function Dashboard() {
    return (
     <div className="mb-[200px]">
      <Card />
      <BarChart />
      <Table />
     </div>
    );
  }
  