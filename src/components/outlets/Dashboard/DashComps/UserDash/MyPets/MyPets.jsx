/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { useContext, useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
//   useSortBy,
} from "@tanstack/react-table";
// import AdminModal from "./AdminModal";
// import PetModal from "./PetModal"; 
import axios from "axios";
import { useSortBy } from "react-table";
import usePets from "../../../../../../custom/usePets";
import { AuthProvider } from "../../../../../../context/AuthContext";


const MyPets = () => {
    const { pets } = usePets()
    const { user } = useContext(AuthProvider)
    
        const myPets = pets.filter(each => each?.userEmail === user?.email )
  const [modalPet, setModalPet] = useState(null);

  const openModal = (pet) => {
    setModalPet(pet);
  };

  const closeModal = () => {
    setModalPet(null);
  };

  const updatePet = (pet) => {
    // Handle pet update logic, redirect the user to the pet update page
    // You can use react-router-dom's history to navigate to the update page
    console.log("Update pet:", pet);
  };

  const deletePet = (pet) => {
    // Handle pet deletion logic
    // You can use a modal to confirm the deletion
    console.log("Delete pet:", pet);
  };

  const adoptPet = (pet) => {
    // Handle pet adoption logic
    // Update the adopted field in the database to true
    // You may want to confirm the adoption with a modal
    console.log("Adopt pet:", pet);
  };

  const columns = [
    {
      header: "",
      accessorKey: "_id",
      cell: (props) => <div className="w-12"></div>
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
            className="w-10 h-10 rounded-full"
          />
        </div>
      ),
    },
    {
      header: "Adoption Status",
      accessorKey: "adopted",
      cell: (props) => (
        <span>{props.row.original.adopted ? "Adopted" : "Not Adopted"}</span>
      ),
    },
    {
      header: "Actions",
      accessorKey: "actions",
      cell: (props) => (
        <div className="flex gap-2">
          <button onClick={() => updatePet(props.row.original)}>
            Update
          </button>
          <button onClick={() => deletePet(props.row.original)}>Delete</button>
          <button onClick={() => adoptPet(props.row.original)}>Adopt</button>
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
      {/* {modalPet && (
        <PetModal
          pet={modalPet}
          handleClose={closeModal}
          // Additional props as needed
        />
      )} */}
    </div>
  );
};

export default MyPets;
