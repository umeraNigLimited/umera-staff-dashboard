import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Calendar, CirclePlus, PlusCircle, Trash } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import "../../styles/table.css";
import Avatar from "../common/Avatar";

const TaskTable = () => {
  const [sections, setSections] = useState([
    { id: 1, name: "Todo", tasks: [] },
    { id: 2, name: "Doing", tasks: [] },
    { id: 3, name: "Done", tasks: [] },
  ]);

  const [assignee, setAsignee] = useState(false);

  const [globalFilter, setGlobalFilter] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();

  const addSection = () => {
    const newSection = {
      id: sections.length + 1,
      name: `Section ${sections.length + 1}`,
      tasks: [],
    };
    setSections([...sections, newSection]);
  };

  const deleteSection = (sectionId) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== sectionId)
    );
  };

  const addTask = (sectionId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: [
                ...section.tasks,
                {
                  id: section.tasks.length + 1,
                  task: "",
                  assignee: "",
                  dueDate: "",
                  priority: "Low",
                  completed: false,
                },
              ],
            }
          : section
      )
    );
  };

  const updateTask = (sectionId, taskId, columnId, value) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId ? { ...task, [columnId]: value } : task
              ),
            }
          : section
      )
    );
  };

  const deleteTask = (sectionId, taskId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.filter((task) => task.id !== taskId),
            }
          : section
      )
    );
  };

  const toggleCompletion = (sectionId, taskId) => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            }
          : section
      )
    );
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "task",
        header: "Task",
        cell: ({ row }) => (
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <input
              type="checkbox"
              checked={row.original.completed}
              onChange={() =>
                toggleCompletion(row.original.sectionId, row.original.id)
              }
              className="w-5 h-5"
            />
            <input
              type="text"
              value={row.original.task}
              onChange={(e) =>
                updateTask(
                  row.original.sectionId,
                  row.original.id,
                  "task",
                  e.target.value
                )
              }
              className="w-full rounded px-2 py-1 bg-transparent border border-gray-300 focus:ring-2 focus:ring-red-500 focus:outline-none text-gray-800"
              placeholder="Enter Task"
            />
          </div>
        ),
      },
      {
        accessorKey: "assignee",
        header: "Assignee",
        cell: ({ row }) =>
          assignee ? (
            <Avatar />
          ) : (
            <CirclePlus className="text-gray-600 hover:text-red-700" />
          ),
      },
      {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => (
          <div className="relative inline-block">
            <input
              type="date"
              id="date-picker"
              value={row.original.dueDate}
              onChange={(e) =>
                updateTask(
                  row.original.sectionId,
                  row.original.id,
                  "dueDate",
                  e.target.value
                )
              }
              class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <label
              for="date-picker"
              class="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full text-gray-600 hover:bg-gray-200 cursor-pointer"
            >
              <Calendar className="text-gray-600" />
            </label>
          </div>
        ),
      },
      {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => (
          <select
            value={row.original.priority}
            onChange={(e) =>
              updateTask(
                row.original.sectionId,
                row.original.id,
                "priority",
                e.target.value
              )
            }
            className="w-full border border-gray-300 rounded px-2 py-1 bg-transparent text-gray-600"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        ),
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <button
            onClick={() => deleteTask(row.original.sectionId, row.original.id)}
            className="text-red-500 hover:text-red-700"
          >
            <Trash size={16} />
          </button>
        ),
      },
    ],
    [toggleCompletion, updateTask, deleteTask]
  );

  return (
    <div className="p-4 bg-transparent min-h-screen">
      {showConfetti && <Confetti width={width} height={height} />}
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Task Manager</h1>
      <button
        onClick={addSection}
        className="bg-green-500 text-white px-4 py-2 rounded flex items-center gap-1 mb-4"
      >
        <PlusCircle size={20} /> Add Section
      </button>

      {/* TABLE SECTION */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="mb-8 p-4 bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl"
        >
          <div className="flex justify-between items-center mb-4">
            {/* SECTION NAME*/}
            <h2 className="text-xl font-bold text-gray-900">{section.name}</h2>
            <button
              onClick={() => deleteSection(section.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash size={20} />
            </button>
          </div>
          <button
            onClick={() => addTask(section.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1 mb-4"
          >
            <PlusCircle size={20} /> Add Task
          </button>
          <div className="overflow-x-auto">
            <table className="w-full border bg-transparent rounded-lg">
              <thead className="">
                {columns.map((column) => (
                  <th
                    key={column.accessorKey}
                    className="px-4 py-2 text-left text-gray-700"
                  >
                    {column.header}
                  </th>
                ))}
              </thead>
              <tbody>
                {section.tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:border hover:border-gray-100 hover:bg-gray-500 hover:bg-opacity-20 hover:shadow-lg border-t border-gray-300 bg-transparent"
                  >
                    {columns.map((column) => (
                      <td key={column.accessorKey} className="px-4 py-2">
                        {column.cell({
                          row: { original: { ...task, sectionId: section.id } },
                        })}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskTable;
