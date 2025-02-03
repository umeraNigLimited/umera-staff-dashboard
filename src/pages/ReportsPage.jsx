import Header from "../components/common/Header";
import { HelpCircle, Plus } from "lucide-react";

import Report from "../components/reports/Report";
import { useState } from "react";
import ReportInputForm from "../components/reports/ReportInputForm";
import { useReportContext } from "../components/hooks/useReportContext";

const AnalyticsPage = () => {
  const [createReport, setCreateReport] = useState(false);
  // const [reports, setReports] = useState(reports);
  function onCreateReport() {
    setCreateReport((prev) => !prev);
  }

  const onSubmit = (report) => {
    setReports([...reports, report]);
  };

  const { report } = useReportContext();

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-200">
      <Header title={"Reports"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8 mt-16">
        <button
          className="bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200 w-full sm:w-auto flex items-center justify-center outline-0"
          onClick={onCreateReport}
        >
          {createReport ? (
            "Close Report Form"
          ) : (
            <>
              <Plus size={18} className="mr-2" />
              Create Report
            </>
          )}
        </button>
        {createReport && (
          <ReportInputForm
            onSubmit={onSubmit}
            createReport={createReport}
            setCreateReport={setCreateReport}
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {report?.map((reports, _) => (
            <Report key={reports.report_id} data={reports} />
          ))}
        </div>

        {/* <OverviewCards />
        <RevenueChart />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ChannelPerformance />
          <ProductPerformance />
          <UserRetention />
          <CustomerSegmentation />
        </div> */}

        {/* <AIPoweredInsights /> */}
      </main>
    </div>
  );
};
export default AnalyticsPage;
