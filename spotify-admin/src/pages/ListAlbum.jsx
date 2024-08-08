import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { url } from '../App';
import { toast } from 'react-toastify';

const ListAlbum = () => {
    const [data, setData] = useState([]);


    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/list`);

            console.log("fetchAlbums message ",response);
            if (response.status == 200) {
                console.log("getting here")
                setData(response.data.albums);
                // console.log("data is : ", data);
            }
            console.log("not getting here");
        } catch (error) {
            toast.error("Error Occurred");
        }
    };

    const removeAlbum = async (id) => {
        console.log("working properly")
        try {

            const response = await axios.post(`${url}/api/album/remove`, {id})
            console.log("listalbum spotify-admin ",id);
            console.log("cool")
            console.log(response);
            if (response.status == 200) {
                console.log("not okay 1")
                toast.success(response.data.message);
                await fetchAlbums();
            }
            console.log("not okay")
        } catch (error) {
            toast.error("Error Occur");
        }
    }

    useEffect(() => {
        fetchAlbums();
    }, []);

    return (
        <div>
            <p className=''>All Album List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Colour</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    console.log(item);
                    return (
                        <div key={index} className='grid grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>

                            <img className='w-12' src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColour} readOnly />
                            <p className='cursor-pointer' onClick={() => removeAlbum(item._id)}>x</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ListAlbum
