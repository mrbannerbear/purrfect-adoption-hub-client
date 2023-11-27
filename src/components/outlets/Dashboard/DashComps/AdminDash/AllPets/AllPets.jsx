/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { MdEdit } from "react-icons/md";
import { useMemo } from "react";
import usePets from "../../../../../../custom/usePets";

const AllPets = () => {
  const { pets } = usePets();
  const data = useMemo(() => pets, [])

  /** @type import("@tanstack/react-table").ColumnDef<any>*/
  const columns = [
    {
        header: "Name",
        accessorKey: "name"
    },
    {
        header: "Image",
        accessorKey: "image",
        cell: (props) => {
            return <div className="flex justify-center">
                <img src={props.row.original.image} alt="" className="w-16 h-12 rounded-sm" />
            </div>
        }
    },
    {
        header: "Adopted",
        accessorKey: "adopted"
    }
  ]
  const table = useReactTable({data, columns, getCoreRowModel:
getCoreRowModel()})
  console.log(pets)
 

  return <div className="min-h-screen">
    <h1 className="py-6 text-center text-3xl font-semibold font-poppins">All Pets</h1>
      <div className="w-[90%] mx-auto border-2">
        <table className="w-full">
            {
                table.getHeaderGroups().map(
                    headerGroup => (
                        <tr key={headerGroup.id} className="w-20">
                            {
                                headerGroup.headers.map(
                                    header => (
                                        <th key={header.id} className="w-1/4 font-poppins border">
                                            {
                                                flexRender(header.column.columnDef.header,
                                                    header.getContext())
                                            }
                                        </th>
                                    )
                                )
                            }
                        </tr>
                    )
                )
            }
          
            <tbody>
                {
                    table.getRowModel().rows.map(
                        row => (
                            <tr key={row.id}>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td className="text-center border px-3 py-2">
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        )
                    )
                }
                <tr>
                    <td></td>
                </tr>
            </tbody>

        </table>
      </div>
  </div>;
};

export default AllPets;
