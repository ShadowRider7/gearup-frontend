import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type loginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type registerState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
    };
  };
};
// {
//     "success": true,
//     "statusCode": 200,
//     "message": "User Profile fetched successfully",
//     "data": {
//         "userProfile": {
//             "id": "1985c9fd-b178-41a1-9f3b-e9735e608b7d",
//             "name": "sadhin pro",
//             "email": "sadhin@gmail.com",
//             "role": "CUSTOMER",
//             "status": "ACTIVE",
//             "createdAt": "2026-07-10T20:18:48.889Z",
//             "updatedAt": "2026-07-10T20:18:48.889Z",
//             "profile": {
//                 "id": "268dd6c4-1bc3-4859-82c9-ca5b733ca4df",
//                 "profilePhoto": "www.sadhin.com",
//                 "phone": "+8801973824849",
//                 "address": "sadhin location",
//                 "bio": "sadhin bio",
//                 "userId": "1985c9fd-b178-41a1-9f3b-e9735e608b7d",
//                 "createdAt": "2026-07-10T20:18:48.889Z",
//                 "updatedAt": "2026-07-10T20:18:48.889Z"
//             }
//         }
//     }
// }

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    userProfile: {
      id: string;
      name: string;
      email: string;
      role: string;
      status: string;
      createdAt: string;
      updatedAt: string;
      profile: {
        id: string;
        profilePhoto: string;
        phone: string;
        address: string;
        bio: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
};
export type NavbarProps = {
  user: IUser;
};

export type ISidebarItem = {
  label: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};
