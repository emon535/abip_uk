import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import AdminSideBar from "../components/AdminSideBar";
import API from "../Api/api";
import { memberUrl } from "../url";
import Table, { Td, Tr } from "../components/Table";
import { Link } from "react-router-dom";



function Member(){
    const [member, setMembers] = useState({data:[],next:{},previous:{}});
    const [src, setSrc] = useState('');
    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(1);


    function search(e){
        setSrc(e.target.value);
    }
    

    useEffect(()=>{
        API.get(`${memberUrl}/?page=${page}&limit=${limit}`).then((data)=>{
            setMembers(data?.result);
        })
    }, [limit, page])


    return(
        <div>
            <AdminNav/>
            <div className=" flex">
                <AdminSideBar/>
                <div className=" ml-[250px] w-[calc(100vw-300px)] h-[100vh-70px] overflow-auto">
                    <Table to="" name="" rowNames={["#","Name","Email","Phone","Actions"]} srcVal={src} srcFunc={search} data={member} setPage={setPage} setLimit={setLimit} >
                        {
                            member.data.map(({_id, name, email, phone}, index)=>{
                                return(
                                    <Tr key={index}>
                                        <Td>{((member.previous.page*member.previous.limit)+1)+index}</Td>
                                        <Td>{name}</Td>
                                        <Td>{email}</Td>
                                        <Td>{phone}</Td>
                                        <Td>
                                            <Link className=" border border-slate-400 p-1 rounded-md bg-green-600 text-white" to={`/member/${_id}`}>View</Link>
                                        </Td>
                                    </Tr>
                                );
                            })
                        }
                        
                    </Table>
                </div>
            </div>

        </div>
    )
}

export default Member;