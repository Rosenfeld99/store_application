import { useEffect, useState } from "react";
import CatItem from "./CatItem"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export default function CatList() {
    const [catList, setCatList] = useState([])

    const fetchData = async () => {

        try {
            const dataList = []
            const q = query(collection(db, "categories"), where("activity", "==", "active"));

            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                dataList.push({ id: doc.id, name: doc.data()?.name, imageSrc: doc.data()?.featured[0]?.imageSrc, imageAlt: doc.data()?.featured[0]?.imageAlt })
                // console.log(doc.id, " => ", doc.data());
            });
            setCatList(dataList)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log(catList);
    return (
        <>{catList?.length > 0 && <div className="py-10 xl:px-0 px-4">
            <h3 className=" py-3 font-bold text-2xl">Shop by Category</h3>
            <div className="carousel carousel-center space-x-4 rounded-box w-full">
                {catList?.map((item, i) => (
                    <CatItem key={i} item={item} />
                ))}
            </div>
        </div>}</>
    )
}
