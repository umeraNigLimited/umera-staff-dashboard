// import React, { useState, useMemo } from "react";
// import {
//   useReactTable,
//   getCoreRowModel,
//   getSortedRowModel,
//   flexRender,
// } from "@tanstack/react-table";
// import { Calendar, CirclePlus, PlusCircle, Trash } from "lucide-react";
// import Confetti from "react-confetti";
// import { useWindowSize } from "react-use";
// import "../../styles/table.css";
// import Avatar from "../common/Avatar";
// import { useTasksContext } from "../hooks/useTasksContext";
// import { format } from "date-fns";
// import { useAuthContext } from "../hooks/useAuthContext";

// const TaskTable = () => {
//   const [task, setTask] = useState([]);
//   const { tasks, dispatch } = useTasksContext();
//   const [sections, setSections] = useState([
//     { id: 1, name: "Todo", tasks: [] },
//     { id: 2, name: "Doing", tasks: [] },
//     { id: 3, name: "Done", tasks: [] },
//   ]);

//   const [assignee, setAsignee] = useState(false);
//   const { user } = useAuthContext();

//   const [globalFilter, setGlobalFilter] = useState("");
//   const [showConfetti, setShowConfetti] = useState(false);
//   const { width, height } = useWindowSize();

//   const handleDelete = async () => {
//     if (!user) {
//       return;
//     }
//     const response = await fetch(`http://localhost:29199/api/task/${task_id}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     });

//     const json = await response.json();

//     if (response.ok) {
//       dispatch({ type: "DELETE TASK", payload: json });
//       setTask(tasks);
//     }
//   };

//   const addSection = () => {
//     const newSection = {
//       id: sections.length + 1,
//       name: `Section ${sections.length + 1}`,
//       tasks: [],
//     };
//     setSections([...sections, newSection]);
//   };

//   const deleteSection = (sectionId) => {
//     setSections((prevSections) =>
//       prevSections.filter((section) => section.id !== sectionId)
//     );
//   };

//   const addTask = (sectionId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               tasks: [
//                 ...section.tasks,
//                 {
//                   id: section.tasks.length + 1,
//                   task: "",
//                   assignee: "",
//                   dueDate: "",
//                   priority: "Low",
//                   completed: false,
//                 },
//               ],
//             }
//           : section
//       )
//     );
//   };

//   const updateTask = (sectionId, taskId, columnId, value) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               tasks: section.tasks.map((task) =>
//                 task.id === taskId ? { ...task, [columnId]: value } : task
//               ),
//             }
//           : section
//       )
//     );
//   };

//   const deleteTask = (sectionId, taskId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               tasks: section.tasks.filter((task) => task.id !== taskId),
//             }
//           : section
//       )
//     );
//   };

//   const toggleCompletion = (sectionId, taskId) => {
//     setSections((prevSections) =>
//       prevSections.map((section) =>
//         section.id === sectionId
//           ? {
//               ...section,
//               tasks: section.tasks.map((task) =>
//                 task.id === taskId
//                   ? { ...task, completed: !task.completed }
//                   : task
//               ),
//             }
//           : section
//       )
//     );
//     setShowConfetti(true);
//     setTimeout(() => setShowConfetti(false), 2000);
//   };

//   const columns = useMemo(
//     () => [
//       {
//         accessorKey: "task_content",
//         header: "Task",
//         cell: ({ row }) => (
//           <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//             <input
//               type="checkbox"
//               checked={row.original.completed}
//               onChange={() =>
//                 toggleCompletion(row.original.sectionId, row.original.id)
//               }
//               className="w-5 h-5"
//             />
//             <input
//               type="text"
//               value={row.original.task}
//               onChange={(e) =>
//                 updateTask(
//                   row.original.sectionId,
//                   row.original.id,
//                   "task",
//                   e.target.value
//                 )
//               }
//               className="w-full rounded px-2 py-1 bg-transparent border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-800"
//               placeholder="Enter Task"
//             />
//           </div>
//         ),
//       },
//       {
//         accessorKey: "assignee",
//         header: "Assignee",
//         cell: ({ row }) =>
//           assignee ? (
//             <Avatar />
//           ) : (
//             <CirclePlus className="text-gray-600 hover:text-red-700" />
//           ),
//       },
//       {
//         accessorKey: "due_date",
//         header: "Due Date",
//         cell: ({ row }) => (
//           <>
//             {!row ? (
//               <div className="relative inline-block">
//                 <input
//                   type="date"
//                   id="date-picker"
//                   value={row.original.dueDate}
//                   onChange={(e) =>
//                     updateTask(
//                       row.original.sectionId,
//                       row.original.id,
//                       "dueDate",
//                       e.target.value
//                     )
//                   }
//                   class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                 />
//                 <label
//                   for="date-picker"
//                   class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer"
//                 >
//                   <Calendar className="text-gray-600" />
//                 </label>
//               </div>
//             ) : (
//               format(new Date(row), "dd MM")
//             )}
//           </>
//         ),
//       },
//       {
//         accessorKey: "priority",
//         header: "Priority",
//         cell: ({ row }) => (
//           <select
//             value={row.original.priority}
//             onChange={(e) =>
//               updateTask(
//                 row.original.sectionId,
//                 row.original.id,
//                 "priority",
//                 e.target.value
//               )
//             }
//             className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent text-gray-600"
//           >
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         ),
//       },
//       {
//         accessorKey: "actions",
//         header: "Actions",
//         cell: ({ row }) => (
//           <button
//             onClick={() => deleteTask(row.original.sectionId, row.original.id)}
//             className="text-red-500 hover:text-red-700"
//           >
//             <Trash size={16} />
//           </button>
//         ),
//       },
//     ],
//     [toggleCompletion, updateTask, deleteTask]
//   );

//   return (
//     <div className="p-4 bg-transparent min-h-screen">
//       {showConfetti && <Confetti width={width} height={height} />}
//       <h1 className="text-2xl font-bold mb-4 text-gray-900">Task Manager</h1>
//       <button
//         onClick={addSection}
//         className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1 mb-4"
//       >
//         <PlusCircle size={20} /> Add Section
//       </button>

//       {/* TABLE SECTION */}
//       {sections.map((section) => (
//         <div
//           key={section.id}
//           className="mb-8 p-4 bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl"
//         >
//           <div className="flex justify-between items-center mb-4">
//             {/* SECTION NAME*/}
//             <h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
//             <button
//               onClick={() => deleteSection(section.id)}
//               className="text-red-500 hover:text-red-700"
//             >
//               <Trash size={20} />
//             </button>
//           </div>
//           <button
//             onClick={() => addTask(section.id)}
//             className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1 mb-4"
//           >
//             <PlusCircle size={20} /> Add Task
//           </button>
//           <div className="overflow-x-auto">
//             <table className="w-full border bg-transparent rounded-lg">
//               <thead className="">
//                 {columns.map((column) => (
//                   <th
//                     key={column.accessorKey}
//                     className="px-4 py-2 text-left text-gray-700"
//                   >
//                     {column.header}
//                   </th>
//                 ))}
//               </thead>
//               <tbody>
//                 {section.tasks.map((task) => (
//                   <tr
//                     key={task.id}
//                     className="hover:border hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-20 hover:shadow-lg border-t border-gray-300 bg-transparent"
//                   >
//                     {columns.map((column) => (
//                       <td key={column.accessorKey} className="px-4 py-2">
//                         {column.cell({
//                           row: { original: { ...task, sectionId: section.id } },
//                         })}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default TaskTable;

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Calendar, Edit, Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/overview-tasks.css";

function TaskTable({ d }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [datePickerValues, setDatePickerValues] = useState(
    d.reduce((acc, task) => {
      acc[task.id] = new Date(task.due_date);
      return acc;
    }, {})
  );

  const data = useMemo(() => d || [], [d]);

  const columns = [
    {
      header: "Tasks",
      accessorKey: "task_content",
      cell: (info) => info.getValue(),
    },
    // {
    //   header: "Assignee",
    //   accessorKey: "assignee",
    //   cell: (info) => <span>{info.getValue()}</span>,
    // },
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (info) => <span>{info.getValue()}</span>,
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full ${
            info.getValue()
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {info.getValue() ? "Completed" : "Pending"}
        </span>
      ),
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: (info) => {
        const id = info.row.original.id;
        const dueDate = info.getValue();

        // Parse the date or provide a fallback
        const parsedDate = dueDate ? parseISO(dueDate) : null;

        return (
          <DatePicker
            selected={parsedDate}
            onChange={(date) => {
              handleSaveTask(id, {
                due_date: date ? date.toISOString() : null,
              });
            }}
            className="border rounded px-2 py-1"
            dateFormat="d MMM"
            placeholderText="Select a date"
          />
        );
      },
    },
    {
      header: "Action",
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => console.log("Edit Task:", info.row.original)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => console.log("Delete Task:", info.row.original)}
            className="p-2 text-red-600 hover:bg-red-100 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
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
      </div>

      <div className="overflow-x-auto bg-white shadow rounded-lg min-h-80">
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

        <span className="text-sm text-gray-800">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <div className="flex items-center gap-2">
          <button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
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

export default TaskTable;
