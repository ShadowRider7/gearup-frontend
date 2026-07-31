import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

// Use TitleCase naming conventions for Type Exports to match standard TS guidelines

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
  _count: {
    rentals: number;
    reviews: number;
  };
  averageRating: number;
};

// Fixed CategoryItems logic: Changed tuple format into an array of categories containing gears
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

// Fixed GearItems array logic: Replaced the 1-element tuple with standard Array mapping
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
      gearItem: Gear; // Fixed missing reference to uppercase 'Gear'
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
