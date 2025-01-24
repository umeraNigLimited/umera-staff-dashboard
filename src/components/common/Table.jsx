import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { formatDistanceToNow, isBefore } from "date-fns";
import "../../styles/overview-tasks.css";
import { Plus } from "lucide-react";

function TanStackTable({ d }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const list = ["to_do", "pending", "completed"];

  const data = useMemo(() => d || [], [d]);

  const columns = [
    {
      header: "Tasks",
      accessorKey: "task_content",
      size: 400,
      cell: (info) => {
        const value = info.getValue();
        return value || null;
      },
    },
    // {
    //   header: "Status",
    //   accessorKey: "status",
    //   size: 100,
    //   cell: (info) => (
    // <span
    //   className={`px-2 py-1 rounded-full ${
    //     info.getValue()
    //       ? "bg-green-100 text-green-800"
    //       : "bg-red-100 text-red-800"
    //   }`}
    // >
    //   {info.getValue() ? "Completed" : "Pending"}
    // </span>
    //     <span
    //       className={`px-2 py-1 rounded-full ${
    //         info.getValue() == "completed"
    //           ? "bg-green-100 text-green-800"
    //           : "bg-red-100 text-red-800"
    //       }`}
    //     >
    //       {info.getValue()}
    //     </span>
    //   ),
    // },
    {
      header: " Due Date",
      accessorKey: "due_date",
      cell: (info) => {
        //Get the Task Conntent
        const task = info.row.original.task_content;
        // Get the due_date value
        const dueDateValue = info.getValue();

        // Do not render anything if there's no task
        if (!task) return null;

        // Check if the due_date is valid (not null or undefined)
        if (!dueDateValue) {
          return <span className="text-gray-500">No due date</span>; // or any default text you want to show
        }

        const dueDate = new Date(dueDateValue);
        const now = new Date();

        // Check if the due date is in the past
        const isPast = isBefore(dueDate, now);

        // Format the time difference
        const timeText = formatDistanceToNow(dueDate);

        return (
          <span
            className={`${
              isPast ? "text-red-500" : "text-blue-500"
            } font-medium`}
          >
            {isPast ? `${timeText} ago` : `${timeText} left`}
          </span>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    onPaginationChange: setPagination,
  });

  // Debugging output
  // console.log("Data Length:", data.length);
  // console.log("Current Page Index:", table.getState().pagination.pageIndex);
  // console.log("Page Size:", table.getState().pagination.pageSize);
  // console.log("Total Pages:", table.getPageCount());

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        <input
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          placeholder="Search tasks..."
          className="w-full max-w-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
        />
        {/* <span className="bg bg-red-800 cursor-pointer">
          <Plus to="/task" />
        </span> */}
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg h-auto">
        <table
          className="min-w-full border-collapse h-full"
          id="overview-tasks"
        >
          <thead className="bg-gray-200 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left text-sm font-semibold cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() === "asc" && " 🔼"}
                    {header.column.getIsSorted() === "desc" && " 🔽"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 even:bg-gray-50 text-gray-800"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm font-medium bg-red-800 text-white rounded disabled:bg-gray-300"
          >
            First
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-sm font-medium bg-red-800 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
        </div>

        <span className="text-sm text-gray-800 page-number">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => {
              console.log("Next Page");
              table.nextPage();
            }}
            className="px-4 py-2 text-sm font-medium bg-red-800 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-sm font-medium bg-red-800 text-white rounded disabled:bg-gray-300"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
}

export default TanStackTable;
