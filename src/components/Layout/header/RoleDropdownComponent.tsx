import { FC } from "react";

interface RoleDropdownComponentProps {
    userRole: string | null;    
    isChanging: boolean;        
    onRoleChange: (role: string) => Promise<void>
};

const RoleDropdownComponent: FC<RoleDropdownComponentProps> = ({
    userRole,
    isChanging,    
    onRoleChange
}) => {
    const availableRoles = ["student", "mentor", "admin", "superadmin"]; //TO DO GET roles backend
    return (
               
                <div className="absolute mt-1 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 py-1">
                    <p className="text-xs text-gray-500 px-3 py-1 italic">Cambiar a:</p>
                    {availableRoles.map((role) => (
                        <button
                            key={role}
                            disabled={isChanging}
                            onClick={() => onRoleChange(role)}
                            className={`w-full text-left px-4 py-2 text-sm ${userRole === role ? 'bg-gray-100 font-bold' : 'hover:bg-gray-100'
                                } cursor-pointer transition-colors`}
                        >
                            {role}
                        </button>
                    ))}
                </div>
            
       
    );
};

export default RoleDropdownComponent;
