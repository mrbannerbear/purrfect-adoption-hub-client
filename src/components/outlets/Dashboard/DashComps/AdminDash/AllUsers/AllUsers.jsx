/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import useUsers from "../../../../../../custom/useUsers";
import { useMemo, useState } from "react";
import AdminModal from "./AdminModal";

const AllUsers = () => {
  const { users } = useUsers();
  const data = useMemo(() => users, []);
  const [modalEmail, setModalEmail] = useState(null);

  const openModal = (email) => {
    setModalEmail(email);
  };

  const closeModal = () => {
    setModalEmail(null);
  };

  const OpenModal = (email) => {
    console.log(email)
    return <AdminModal email={email}></AdminModal>
  }
  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (props) => {
        return (
          <div className="flex justify-center">
            <img
              src={props.row.original.image}
              alt=""
              className="w-10 h-10 rounded-full"
            />
          </div>
        );
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: (props) => (
        <div className="w-full flex justify-center">
          <div className="flex justify-center gap-[3px] items-center">
            {props.row.original.role}
            <AdminModal
              email={props.row.original.email}
              name= {props.row.original.name}
              role= {props.row.original.role}
              isOpen={modalEmail === props.row.original.email}
              handleClose={closeModal}
            />
            
          </div>
        </div>
      ),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
        All Users
      </h1>
      <div className="w-[90%] mx-auto">
        <table>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w-20">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="w-1/4 font-poppins border">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className="text-center border px-3 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
