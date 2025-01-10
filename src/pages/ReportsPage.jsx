import Header from "../components/common/Header";
import { HelpCircle, Plus } from "lucide-react";

import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/ProductivityChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import Report from "../components/reports/Report";
import { useState } from "react";
import ReportInputForm from "../components/reports/ReportInputForm";

const report = [
  {
    id: 1,
    title: "Issue with Payment Gateway",
    content:
      "The payment gateway fails to process transactions intermittently during peak hours. Customers often report receiving error messages such as 'Transaction Failed' or 'Payment Could Not Be Processed.' This issue occurs mainly during high-traffic periods, which impacts customer satisfaction and leads to a loss of revenue. It seems to be related to the third-party payment provider's API performance.",
    date: "2025-01-08",
    adminReview: {
      status: "Pending",
      comment: "",
    },
  },
  {
    id: 2,
    title: "Login Failure on Mobile Devices",
    content:
      "Users are unable to log in to their accounts on mobile devices using the Google SSO option. The issue is primarily reported on the latest version of iOS, though some Android users have encountered it as well. The 'Sign In with Google' button does not respond, and users are redirected to an error page. This is causing a significant number of customer complaints.",
    date: "2025-01-07",
    adminReview: {
      status: "Reviewed",
      comment:
        "The issue was fixed by updating the OAuth library used for Google SSO.",
    },
  },
  {
    id: 3,
    title: "Broken Links on Help Page",
    content:
      "Several links on the help page redirect users to a 404 error page, creating confusion and frustration. The affected links include 'Contact Support,' 'FAQs,' and 'Terms and Conditions.' This issue has been reported multiple times by users, and it significantly impacts their ability to find critical support resources.",
    date: "2025-01-06",
    adminReview: {
      status: "Pending",
      comment: "",
    },
  },
  {
    id: 4,
    title: "Performance Lag on Dashboard",
    content:
      "The dashboard experiences performance lags, particularly when loading charts and analytics. It often takes more than 10 seconds to fully load after logging in, which frustrates users who rely on real-time insights for their tasks. The issue becomes more prominent when users access the system during business hours with high traffic.",
    date: "2025-01-05",
    adminReview: {
      status: "Reviewed",
      comment:
        "We identified a bottleneck in the database queries and optimized them to improve performance.",
    },
  },
  {
    id: 5,
    title: "Data Duplication in Reports",
    content:
      "Sales reports are showing duplicate entries for certain transactions. This problem appears to affect orders placed within the last week and is causing discrepancies in financial records. Upon investigation, it seems that the duplication occurs during the batch processing of order data in the database.",
    date: "2025-01-04",
    adminReview: {
      status: "Pending",
      comment: "",
    },
  },
  {
    id: 6,
    title: "Missing Localization Strings",
    content:
      "Some sections of the app show untranslated text, which appears as placeholders such as 'string_missing' or 'undefined.' This issue primarily affects users who have selected non-English languages in their settings. Key areas affected include the settings menu and error messages displayed on the payment screen.",
    date: "2025-01-03",
    adminReview: {
      status: "Reviewed",
      comment:
        "Localization files have been updated, and missing strings were added.",
    },
  },
  {
    id: 7,
    title: "Unauthorized Access Detected",
    content:
      "An unauthorized user gained access to restricted admin features, allowing them to view and edit sensitive data. The breach was detected after unusual activity was logged in the system's audit trail. The incident raises concerns about the security of user roles and permissions.",
    date: "2025-01-02",
    adminReview: {
      status: "Pending",
      comment: "",
    },
  },
  {
    id: 8,
    title: "Search Function Not Working",
    content:
      "The search bar fails to return results when users input specific keywords, even when the relevant data exists in the system. This issue has been reported across multiple modules, including Products, Customers, and Orders. Users are instead shown a 'No Results Found' message, leading to productivity loss.",
    date: "2025-01-01",
    adminReview: {
      status: "Reviewed",
      comment:
        "A bug in the search algorithm was identified and resolved. Search results are now accurate.",
    },
  },
  {
    id: 9,
    title: "Email Notifications Delayed",
    content:
      "Email notifications are delayed by several hours, disrupting users' ability to receive order confirmations and password reset emails in a timely manner. Logs indicate that the email queue is backing up due to a high volume of outgoing messages. This issue requires immediate attention to avoid further user dissatisfaction.",
    date: "2024-12-31",
    adminReview: {
      status: "Pending",
      comment: "",
    },
  },
  {
    id: 10,
    title: "User Profile Update Error",
    content:
      "Users encounter an error message when trying to update their profile information, particularly the email address and phone number fields. The error message states 'Unable to Save Changes.' This issue has been reported by users on both desktop and mobile platforms, hindering their ability to maintain accurate account information.",
    date: "2024-12-30",
    adminReview: {
      status: "Reviewed",
      comment:
        "Fixed the validation logic in the backend to properly handle profile updates.",
    },
  },
];

const AnalyticsPage = () => {
  const [createReport, setCreateReport] = useState(false);
  const [reports, setReports] = useState(report);
  function onCreateReport() {
    setCreateReport((prev) => !prev);
    console.log("The on Create Button was clicked");
  }

  const onSubmit = (report) => {
    setReports([...reports, report]);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-200">
      <Header title={"Reports"} />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
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
        {createReport && <ReportInputForm onSubmit={onSubmit} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {reports.map((reports, index) => (
            <Report
              key={index}
              title={reports.title}
              date={reports.date}
              content={reports.content}
            />
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
