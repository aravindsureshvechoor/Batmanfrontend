import React from 'react'

const Adminuserdash = () => {

    








  return (
    <>
    <table class="min-w-[1500px] ml-[390px] mt-12 bg-white rounded-md shadow overflow-hidden">
    <thead class="bg-gray-50">
        <tr>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">ID</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">First Name</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Last Name</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Date Joined</th>
            <th class="px-6 py-3 text-xs font-medium tracking-wider text-left text-black uppercase">Action</th>
        </tr>
    </thead>
    <tbody>
        <tr style={{backgroundColor:"#000000"}}>
            <td class="px-6 py-4 text-sm font-medium text-white whitespace-nowrap">1</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">First Name</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">Last Name</td>
            <td class="px-6 py-4 text-sm text-white whitespace-nowrap">Date Joined</td>
            <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Block
                </button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Unblock
                </button>
            </td>
        </tr>
    </tbody>
</table>   
    
    </>
  )
}

export default Adminuserdash