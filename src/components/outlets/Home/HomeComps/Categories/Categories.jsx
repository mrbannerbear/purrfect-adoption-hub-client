import { NavLink } from "react-router-dom"

const Categories = () => {

    const CategoryList = [
        {
            id: 1,
            name: "Cats",
            path: "pet-listings?qa=cat",
            img: "https://images.unsplash.com/photo-1600357077527-930ccbaf7773?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            name: "Dogs",
            path: "pet-listings?qa=dog",
            img: "https://images.unsplash.com/photo-1592817797597-392e3b878e1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            name: "Rabbits",
            path: "pet-listings?qa=rabbit",
            img: "https://images.unsplash.com/photo-1604953305989-21acd7a029ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            name: "Fish",
            path: "pet-listings?qa=fish",
            img: "https://images.unsplash.com/photo-1436891461396-6df41158de09?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ]

    return (
        <div className="lg:px-24 py-12 lg:py-20">
            <h1 className="font-semibold text-center text-3xl">Adopt Your Favorite <span className="text-orange-600">Pet</span></h1>
            <p className="text-center text-gray-500 text-sm font-poppins my-2">Because we all love a cute ball of fur (or scales!)</p>
                <div className="flex justify-center flex-wrap gap-5 mt-6">
                        {
                            CategoryList.map(
                                each => (
                                    <NavLink  key={each.id} to={each.path}>
                                    <div className="py-3 px-4 bg-cover w-56 h-56 flex justify-center items-center 
                                           transition-all hover:scale-105 relative rounded-lg"
                                      style={{backgroundImage: `url(${each.img})`}}>
                                          <div className=" bg-gradient-to-t from-black/60 to-transparent absolute h-full w-full rounded-lg"></div>
                                       <div>
                                       <h2 className="font-medium text-3xl text-white relative top-14">{each.name}</h2>
                                       </div>
                                    </div>
                                    </NavLink>
                                )
                            )
                        }
                </div>
        </div>
    );
};

export default Categories;