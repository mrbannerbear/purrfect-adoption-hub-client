/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useContext, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  //   useSortBy,
} from "@tanstack/react-table";
import { useSortBy } from "react-table";
import usePets from "../../../../../../custom/usePets";
import { AuthProvider } from "../../../../../../context/AuthContext";
import { NavLink } from "react-router-dom";
import PetDelete from "../../AdminDash/AllPets/AllPetsComps/PetDelete";
import Modal from "../../../../EachPet/EachPetComps/Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyPets = () => {
  const { pets, refetch } = usePets();
  const { user } = useContext(AuthProvider);

  const myPets = pets.filter((each) => each?.userEmail === user?.email);

  const HandleAdopt = (event, id) => {
    event.preventDefault();
    const pet = pets.find(each => each._id === id)
    axios
      .patch(`https://purrfect-server.vercel.app/all-pets/${id}`, { adopted: pet?.adopted == "true" ? "false" : "true", userEmail: user?.email})
      .then((res) => {
        console.log(res);
        if(res.data.modifiedCount > 0){
            refetch();
        }
      })
      .catch((err) => alert(err));
  };

  const columns = [
    {
      header: "",
      accessorKey: "_id",
      cell: (props) => <span>{myPets.indexOf(props.row.original) + 1}</span>,
    },
    {
      header: "Pet Name",
      accessorKey: "name",
    },
    {
      header: "Pet Category",
      accessorKey: "category",
    },
    {
      header: "Pet Image",
      accessorKey: "image",
      cell: (props) => (
        <div className="flex justify-center">
          <img
            src={props.row.original.image}
            alt=""
            className="w-full h-full"
          />
        </div>
      ),
    },
    {
      header: "Adoption Status",
      accessorKey: "adopted",
      cell: (props) => (
        <span>
          {!props.row.original.adopted ||
          props.row.original?.adopted === "false"
            ? "Not Adopted"
            : "Adopted"}
        </span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props) => (
        <div className="flex gap-2">
          <NavLink to={`/dashboard/pet-update/${props.row.original._id}`}>
            <button className="btn1">Update</button>
          </NavLink>
          <PetDelete id={props.row.original._id}></PetDelete>
          <button onClick={() => HandleAdopt(event, props.row.original._id)} className="btn1">Adopt</button>
        </div>
      ),
    },
  ];

  const data = useMemo(() => myPets, [myPets]);

  const table = useReactTable(
    {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
    },
    useSortBy
  );

  return (
    <div className="min-h-screen">
      <h1 className="py-6 text-center text-3xl font-semibold font-poppins">
        All Pets
      </h1>
      <div className="w-[90%] mx-auto">
        <table>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="w-20">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="w-1/4 font-poppins border"
                  //   {...header.getHeaderProps(header.getSortByToggleProps())}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <span>
                    {/* {header.isSorted ? (header.isSortedDesc ? " 🔽" : " 🔼") : ""} */}
                  </span>
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
      <Toaster></Toaster>
    </div>
  );
};

export default MyPets;
