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

export type categoryItems = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    categoryList: {
      data: [
        {
          id: string;
          name: string;
          description: string;
          createdAt: string;
          updatedAt: string;
        },
        gearItem[],
      ];
    };
  };
};
export type provider = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type gearItem = {
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
  category: category;
  provider: provider;
  _count: {
    rentals: number;
    reviews: number;
  };
  averageRating: number;
};
export type gearItems = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    gearItemsList: {
      data: [
        {
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
          category: category;
          provider: provider;
          _count: {
            rentals: number;
            reviews: number;
          };
          averageRating: number;
        },
      ];
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    };
  };
};

export type rentalOrder = {
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
      gearItem: gearItem;
      customer: IUser["data"]["userProfile"];
    };
  };
};

export type paymentHistory = {
  success: boolean;
  statusCode: number;
  message: string;
  data: [
    {
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
    },
  ];
};

export type review = {
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
