import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type LoginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type RegisterState = {
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

export type Provider = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Gear = {
  id: string;
  providerId: string;
  categoryId: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  images: string[];
  specifications: Record<string, string | boolean | number>;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  category: Category;
  provider: Provider;
  reviews: Review[];
  _count: {
    rentals: number;
    reviews: number;
  };
  averageRating: number;
};
export interface OrderFormProps {
  gearItem: Gear;
  user: IUser;
}
export type UserRentalOrders = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    usersRentalOrders: Array<
      RentalOrder["data"]["rentalOrder"] & {
        payment?: PaymentHistory["data"][0];
        review?: Review["data"]["review"];
      }
    >;
  };
};
// {
//     "success": true,
//     "statusCode": 200,
//     "message": "payment link fetched.",
//     "data": {
//         "paymentUrl": "https://checkout.stripe.com/c/pay/cs_test_a1SnYVWvx2d53YkMv3ZUF55ZBbdgJdLMkcP1sqVFm6o4rfW2eLf0modNmG#fidnandhYHdWcXxpYCc%2FJ2FgY2RwaXEnKSdicGRmZGhqaWBTZHdsZGtxJz8nZmprcXdqaScpJ2R1bE5gfCc%2FJ3VuWnFgdnFaMDRRak99TjRSS11XaWhNT1x2a2RVckhKYDNBN1ZANUpWT0tLSn9OZmA2ZkpBRGhIa1x3bkZuSFBwNEZPQUZ8UmFuMDVSYn80dHQ2NjNTdktQYVVEVzBOcE01NWY2UWlXN0FRJyknY3dqaFZgd3Ngdyc%2FcXdwYCknZ2RmbmJ3anBrYUZqaWp3Jz8nJmNjY2NjYycpJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl"
//     }
// }
export type PaymentResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    paymentUrl: string;
  };
};

export type ProviderRentalOrders = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    orders: Array<
      RentalOrder["data"]["rentalOrder"] & {
        payment?: PaymentHistory["data"][0];
        review?: Review["data"]["review"];
      }
    >;
  };
};
export type CategoryItems = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    categoryList: {
      data: Array<Category & { gearItems?: Gear[] }>;
    };
  };
};

export type GearItems = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    gearItemsList: {
      data: Gear[];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    };
  };
};
export interface orderPayload {
  gearItemId: string;
  startDate: string;
  endDate: string;
  quantity: number;
}
export interface gearPayload {
  categoryId: string;
  name: string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  images: string[];
  specifications: Record<string, string | boolean | number>;
}

export type RentalOrder = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    rentalOrder: {
      id: string;
      customerId: string;
      gearItemId: string;
      startDate: string;
      endDate: string;
      quantity: number;
      totalAmount: number;
      status: string;
      createdAt: string;
      updatedAt: string;
      gearItem: Gear;
      customer: IUser["data"]["userProfile"];
    };
  };
};

export type PaymentHistory = {
  success: boolean;
  statusCode: number;
  message: string;
  data: Array<{
    id: string;
    rentalOrderId: string;
    stripePaymentIntentId: string;
    stripeCustomerId: string;
    amount: number;
    method: string;
    status: string;
    paidAt: string;
    createdAt: string;
    updatedAt: string;
  }>;
};

export type Review = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    review: {
      id: string;
      customerId: string;
      gearItemId: string;
      rentalOrderId: string;
      rating: number;
      comment: string;
      createdAt: string;
      updatedAt: string;
    };
  };
};
export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "PAYMENT_INITIATED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED"
  | "CANCELLED";
