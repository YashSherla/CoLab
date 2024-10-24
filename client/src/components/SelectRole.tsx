import { useEffect, useState } from "react";
import animeGif from '../assets/colab.gif';

interface Role {
    roleName:string,
    desc:string
  }
  interface SelectedRoleProps{
    onRoleSelect : (role:string) => void;
  }
export const SelectRole = ({onRoleSelect}:SelectedRoleProps) =>{
    const role:Role[] = [
      {
        roleName:"Admin",
        desc:"Creates projects and tasks, and manages contributors.",
      },{
        roleName:"Project Manager",
        desc:"Oversees project progress and coordinates between team members.",
      },{
        roleName:"Contributor",
        desc:"Works on assigned tasks and contributes to project deliverables.",
      }
    ]
    const [selectedRole , setSelectedRole] = useState<string|undefined>(window.localStorage.getItem('role')||undefined);
    
    const handleRoleChange = (e:any) =>{
      const role  = e.target.value
      window.localStorage.setItem('role',role);
      setSelectedRole(role)
      onRoleSelect(role)
    }
    useEffect(() => {
      console.log("selected role:", selectedRole);
  }, [selectedRole]);
    return <div>
              <div className="rounded-lg shadow-lg overflow-hidden bg-white h-[13rem]">
                <img src={animeGif} alt="Description of the GIF" />
              </div>
              <div className="text-center mb-6 mt-2">
                <h2 className='text-black dark:text-white text-2xl font-bold mb-4'>Select Your Role</h2>
                <p className='text-gray-600 dark:text-gray-300'>
                  Please choose a role to proceed with. This will determine your permissions and access level within the platform.
                </p>
              </div>
              <div className="nb-6">
                {
                  role.map((value,index)=>{
                    return <div key={index}>
                      <label className='flex items-center'>
                        <input
                          type="radio"
                          name="role"
                          value={value.roleName}
                          checked={selectedRole === value.roleName}
                          onChange={handleRoleChange}
                          className="mr-2"
                        />
                        <span className='text-black dark:text-white text-lg font-medium'>{value.roleName}</span>
                      </label>
                      <p className="text-sm dark:text-gray-300 ml-5">{value.desc}</p>
                  </div>
                  })
                }
              </div>
              
            </div>
  }
  