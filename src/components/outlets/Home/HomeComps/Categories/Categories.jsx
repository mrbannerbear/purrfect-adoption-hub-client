import { NavLink } from "react-router-dom"

const Categories = () => {

    const CategoryList = [
        {
            id: 1,
            name: "Cat",
            path: "category?qa=cats",
            img: "https://images.unsplash.com/photo-1600357077527-930ccbaf7773?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 2,
            name: "Dog",
            path: "category?qa=dogs",
            img: "https://images.unsplash.com/photo-1592817797597-392e3b878e1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 3,
            name: "Rabbit",
            path: "category?qa=rabbits",
            img: "https://images.unsplash.com/photo-1604953305989-21acd7a029ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            id: 4,
            name: "Fish",
            path: "category?qa=fishes",
            img: "https://images.unsplash.com/photo-1436891461396-6df41158de09?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
    ]

    return (
        <div className="lg:px-24 py-12 lg:py-20">
            <h1 className="font-semibold text-center text-3xl">Pick Your Favorite Pet</h1>
            <p className="text-center text-gray-500 text-sm">Because we all have preferences!</p>
                <div className="flex justify-center flex-wrap">
                        {
                            CategoryList.map(
                                each => (
                                    <NavLink  key={each.id} to={each.path}>
                                    <div className="py-3 px-4">
                                        <img src={each.img} alt="" className="rounded-lg hover:shadow-lg w-56 h-40"/>
                                        <div>
                                            <h2>{each.name}</h2>
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