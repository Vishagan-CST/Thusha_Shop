<<<<<<< HEAD

import React, { createContext, useContext, useState, ReactNode } from "react";
import { OrderStatus } from "@/types";
import { mockOrders, mockProducts, mockAppointments } from "@/components/admin/mockData";

interface AdminContextType {
  orders: typeof mockOrders;
  products: typeof mockProducts;
=======
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { OrderStatus } from "@/types";
import { mockOrders, mockAppointments } from "@/components/admin/mockData";
import { getFrameTypes, createFrameType, updateFrameType as apiUpdateFrameType, deleteFrameType as apiDeleteFrameType, FrameType } from "@/api/frameTypes";
import { getCategories, createCategory, updateCategory as apiUpdateCategory, deleteCategory as apiDeleteCategory, Category } from "@/api/categories";
import { fetchProducts, addProduct as apiAddProduct, updateProduct as apiUpdateProduct, deleteProduct as apiDeleteProduct,updateStock as apiUpdateStock,deleteProductImage as apiDeleteProductImage, setPrimaryImage as apiSetPrimaryImage } from "@/api/products";
import {fetchAccessories,addAccessory as apiAddAccessory,updateAccessory as apiUpdateAccessory,deleteAccessory as apiDeleteAccessory,updateAccessoryStock as apiUpdateAccessoryStock,
} from "@/api/accessories"; 
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/product";
import { Accessory } from "@/types/accessory";

interface AdminContextType {
  orders: typeof mockOrders;
  products: Product[];
  accessories :Accessory[];
>>>>>>> upstream/main
  appointments: typeof mockAppointments;
  stats: {
    totalSales: number;
    monthlyRevenue: number;
    totalCustomers: number;
    totalOrders: number;
    pendingOrders: number;
    conversion: number;
  };
<<<<<<< HEAD
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;
  updateAppointmentStatus: (appointmentId: string, newStatus: string) => void;
  deleteAppointment: (appointmentId: string) => void;
  updateStock: (productId: number, newStock: number) => void;
  deleteProduct: (productId: number) => void;
  addProduct: (productData: Omit<typeof mockProducts[0], "id" | "sold">) => void;
=======

  // Frame Types
  frameTypes: FrameType[];
  addFrameType: (name: string ,description:string) => Promise<void>;
  updateFrameType: (id: number, name: string, description:string) => Promise<void>;
  deleteFrameType: (id: number) => Promise<void>;

  // Categories
  categories: Category[];
  addCategory: (name: string,description:string) => Promise<void>;
  updateCategory: (id: number, name: string , description:string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;

  // Orders
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  // Appointments
  updateAppointmentStatus: (appointmentId: string, newStatus: string) => void;
  deleteAppointment: (appointmentId: string) => void;

  // Products
  addProduct: (productData: FormData) => Promise<Product>;
  updateProduct: (id: number, productData: FormData) => Promise<Product>;
  deleteProduct: (id: number) => Promise<void>;
  updateStock: (productId: number, newStock: number) => Promise<void>;
  refreshProducts: () => Promise<void>;

  // Product Image Management
  deleteProductImage: (productId: number, imageId: number) => Promise<void>;
  setPrimaryProductImage: (productId: number, imageId: number) => Promise<void>;

  // Accessories
  addAccessory: (accessoryData: FormData) => Promise<Accessory>;
  updateAccessory: (id: number, accessoryData: FormData) => Promise<Accessory>;
  deleteAccessory: (id: number) => Promise<void>;
  updateAccessoryStock: (accessoryId: number, newStock: number) => Promise<void>;
  refreshAccessories: () => Promise<void>;

>>>>>>> upstream/main
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdminDashboard = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminDashboard must be used within an AdminDashboardProvider");
  }
  return context;
};

interface AdminDashboardProviderProps {
  children: ReactNode;
}

export const AdminDashboardProvider: React.FC<AdminDashboardProviderProps> = ({ children }) => {
<<<<<<< HEAD
  // Data state for simulating real-time changes
  const [orders, setOrders] = useState(mockOrders);
  const [products, setProducts] = useState(mockProducts);
  const [appointments, setAppointments] = useState(mockAppointments);
=======
  const [orders, setOrders] = useState(mockOrders);
  const [products, setProducts] = useState<Product[]>([]);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [appointments, setAppointments] = useState(mockAppointments);
  const { toast } = useToast();
>>>>>>> upstream/main
  const [stats, setStats] = useState({
    totalSales: 25890.75,
    monthlyRevenue: 4560.25,
    totalCustomers: 235,
    totalOrders: 412,
    pendingOrders: 23,
    conversion: 3.2,
  });

<<<<<<< HEAD
  // Function to handle order status update
=======
  const [frameTypes, setFrameTypes] = useState<FrameType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const [frameTypesData, categoriesData, productsData ,accessoriesData] = await Promise.all([
          getFrameTypes(),
          getCategories(),
          fetchProducts(),
          fetchAccessories()
          
        ]);
        setFrameTypes(frameTypesData);
        setCategories(categoriesData);
        setProducts(productsData);
        setAccessories(accessoriesData);
        console.log("✅ Accessory fetch response va:", accessoriesData); // ✅ step 2
      } catch (error) {
        console.error("Failed to load initial data:", error);
        toast({
          title: "Error",
          description: "Failed to load initial data",
          variant: "destructive",
        });
      }
    };
    loadData();
  }, [toast]);

  // Refresh products function
  const refreshProducts = async () => {
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error("Failed to refresh products:", error);
      toast({
        title: "Error",
        description: "Failed to refresh products",
        variant: "destructive",
      });
    }
  };

  const refreshAccessories = async (): Promise<void> => {
  try {
    const data = await fetchAccessories();
    setAccessories(data);
  } catch (error) {
    console.error("Failed to fetch accessories:", error);
    toast({
      title: "Error",
      description: "Failed to load accessories",
      variant: "destructive",
    });
  }
};


  // Order functions
>>>>>>> upstream/main
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              status: newStatus, 
              updatedAt: new Date().toISOString(),
              updatedBy: "Admin" 
            } 
          : order
      )
    );
  };

<<<<<<< HEAD
  // Function to delete an order
=======
>>>>>>> upstream/main
  const deleteOrder = (orderId: string) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

<<<<<<< HEAD
  // Function to handle appointment status update
=======
  // Appointment functions
>>>>>>> upstream/main
  const updateAppointmentStatus = (appointmentId: string, newStatus: string) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

<<<<<<< HEAD
  // Function to delete an appointment
=======
>>>>>>> upstream/main
  const deleteAppointment = (appointmentId: string) => {
    setAppointments(appointments.filter(apt => apt.id !== appointmentId));
  };

<<<<<<< HEAD
  // Function to handle product stock update
  const updateStock = (productId: number, newStock: number) => {
    setProducts(products.map(product => 
      product.id === productId ? { ...product, stock: newStock } : product
    ));
  };

  // Function to delete a product
  const deleteProduct = (productId: number) => {
    setProducts(products.filter(product => product.id !== productId));
  };

  // Function to add a new product
  const addProduct = (productData: Omit<typeof mockProducts[0], "id" | "sold">) => {
    const newId = Math.max(...products.map(p => p.id)) + 1;
    setProducts([
      ...products,
      {
        id: newId,
        ...productData,
        sold: 0
      }
    ]);
  };

=======
  // Product functions
  const addProduct = async (productData: FormData) => {
    try {
      const newProduct = await apiAddProduct(productData);
      setProducts(prev => [...prev, newProduct]);
      toast({
        title: "Success",
        description: "Product added successfully",
      });
      return newProduct;
    } catch (error) {
      console.error("Failed to add product:", error);
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateProduct = async (id: number, productData: FormData): Promise<Product> => {
    try {
      const updatedProduct = await apiUpdateProduct(id, productData);
      setProducts(prev => 
        prev.map(product => 
          product.id === id ? updatedProduct : product
        )
      );
      toast({
        title: "Success",
        description: "Product updated successfully",
      });
      return updatedProduct;
    } catch (error) {
      console.error("Failed to update product:", error);
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive",
      });
      throw error;
    }
  };

  const deleteProduct = async (id: number): Promise<void> => {
    try {
      await apiDeleteProduct(id);
      setProducts(prev => prev.filter(product => product.id !== id));
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete product:", error);
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive",
      });
      throw error;
    }
  };

  
  const updateStock = async (productId: number, newStock: number): Promise<void> => {
  try {
    await apiUpdateStock(productId, newStock);
    const updated = products.map(p =>
      p.id === productId ? { ...p, stock: newStock } : p
    );
    setProducts(updated);
    toast({
      title: "Success",
      description: "Stock updated successfully",
    });
  } catch (error) {
    console.error("Failed to update stock:", error);
    toast({
      title: "Error",
      description: "Failed to update stock",
      variant: "destructive",
    });
    throw error;
  }
};

const deleteProductImage = async (productId: number, imageId: number): Promise<void> => {
  try {
    await apiDeleteProductImage(productId, imageId);
    await refreshProducts(); // Refresh to update UI
    toast({
      title: "Success",
      description: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete product image:", error);
    toast({
      title: "Error",
      description: "Failed to delete image",
      variant: "destructive",
    });
    throw error;
  }
};

const setPrimaryProductImage = async (productId: number, imageId: number): Promise<void> => {
  try {
    await apiSetPrimaryImage(productId, imageId);
    await refreshProducts(); // Refresh to reflect new primary
    toast({
      title: "Success",
      description: "Primary image set successfully",
    });
  } catch (error) {
    console.error("Failed to set primary image:", error);
    toast({
      title: "Error",
      description: "Failed to set primary image",
      variant: "destructive",
    });
    throw error;
  }
};



  // Frame Type functions
  const addFrameType = async (name: string, description: string) => {
    try {
      const newType = await createFrameType(name ,description);
      setFrameTypes(prev => [...prev, newType]);
      toast({
        title: "Success",
        description: "Frame type added successfully",
      });
    } catch (error) {
      console.error("Failed to add frame type:", error);
      toast({
        title: "Error",
        description: "Failed to add frame type",
        variant: "destructive",
      });
    }
  };

  const updateFrameType = async (id: number, name: string , description: string) => {
    try {
      const updated = await apiUpdateFrameType(id, name ,description);
      setFrameTypes(prev => prev.map(f => f.id === id ? updated : f));
      toast({
        title: "Success",
        description: "Frame type updated successfully",
      });
    } catch (error) {
      console.error("Failed to update frame type:", error);
      toast({
        title: "Error",
        description: "Failed to update frame type",
        variant: "destructive",
      });
    }
  };

  const deleteFrameType = async (id: number) => {
    try {
      await apiDeleteFrameType(id);
      setFrameTypes(prev => prev.filter(f => f.id !== id));
      toast({
        title: "Success",
        description: "Frame type deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete frame type:", error);
      toast({
        title: "Error",
        description: "Failed to delete frame type",
        variant: "destructive",
      });
    }
  };

  // Category functions
  const addCategory = async (name: string,description: string) => {
    try {
      const newCategory = await createCategory(name,description);
      setCategories(prev => [...prev, newCategory]);
      toast({
        title: "Success",
        description: "Category added successfully",
      });
    } catch (error) {
      console.error("Failed to add category:", error);
      toast({
        title: "Error",
        description: "Failed to add category",
        variant: "destructive",
      });
    }
  };

  const updateCategory = async (id: number, name: string,description: string) => {
    try {
      const updated = await apiUpdateCategory(id, name,description);
      setCategories(prev => prev.map(cat => cat.id === id ? updated : cat));
      toast({
        title: "Success",
        description: "Category updated successfully",
      });
    } catch (error) {
      console.error("Failed to update category:", error);
      toast({
        title: "Error",
        description: "Failed to update category",
        variant: "destructive",
      });
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await apiDeleteCategory(id);
      setCategories(prev => prev.filter(cat => cat.id !== id));
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    } catch (error) {
      console.error("Failed to delete category:", error);
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    }
  };

  // ADD accessory
const addAccessory = async (accessoryData: FormData): Promise<Accessory> => {
  try {
    const newAccessory = await apiAddAccessory(accessoryData);
    setAccessories(prev => [...prev, newAccessory]);
    toast({
      title: "Success",
      description: "Accessory added successfully",
    });
    return newAccessory;
  } catch (error) {
    console.error("Failed to add accessory:", error);
    toast({
      title: "Error",
      description: "Failed to add accessory",
      variant: "destructive",
    });
    throw error;
  }
};

// UPDATE accessory
const updateAccessory = async (id: number, accessoryData: FormData): Promise<Accessory> => {
  try {
    const updatedAccessory = await apiUpdateAccessory(id, accessoryData);
    setAccessories(prev =>
      prev.map(accessory =>
        accessory.id === id ? updatedAccessory : accessory
      )
    );
    toast({
      title: "Success",
      description: "Accessory updated successfully",
    });
    return updatedAccessory;
  } catch (error) {
    console.error("Failed to update accessory:", error);
    toast({
      title: "Error",
      description: "Failed to update accessory",
      variant: "destructive",
    });
    throw error;
  }
};

// DELETE accessory
const deleteAccessory = async (id: number): Promise<void> => {
  try {
    await apiDeleteAccessory(id);
    setAccessories(prev => prev.filter(accessory => accessory.id !== id));
    toast({
      title: "Success",
      description: "Accessory deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete accessory:", error);
    toast({
      title: "Error",
      description: "Failed to delete accessory",
      variant: "destructive",
    });
    throw error;
  }
};

// UPDATE AccessoryStock
const updateAccessoryStock = async (accessoryId: number, newStock: number): Promise<void> => {
  try {
    await apiUpdateAccessoryStock(accessoryId, newStock);
    const updated = accessories.map(acc =>
      acc.id === accessoryId ? { ...acc, stock: newStock } : acc
    );
    setAccessories(updated);
    toast({
      title: "Success",
      description: "Stock updated successfully",
    });
  } catch (error) {
    console.error("Failed to update accessory stock:", error);
    toast({
      title: "Error",
      description: "Failed to update accessory stock",
      variant: "destructive",
    });
    throw error;
  }
};



>>>>>>> upstream/main
  return (
    <AdminContext.Provider 
      value={{
        orders,
<<<<<<< HEAD
        products,
=======
       
>>>>>>> upstream/main
        appointments,
        stats,
        updateOrderStatus,
        deleteOrder,
        updateAppointmentStatus,
        deleteAppointment,
<<<<<<< HEAD
        updateStock,
        deleteProduct,
        addProduct
=======

         products,
        updateStock,
        deleteProduct,
        addProduct,
        updateProduct,
        refreshProducts,
        setPrimaryProductImage,
        deleteProductImage,


        accessories,
        updateAccessory,
        addAccessory,
        deleteAccessory,
        updateAccessoryStock,
        refreshAccessories,

        frameTypes,
        addFrameType,
        updateFrameType,
        deleteFrameType,

        categories,
        addCategory,
        updateCategory,
        deleteCategory,
>>>>>>> upstream/main
      }}
    >
      {children}
    </AdminContext.Provider>
  );
<<<<<<< HEAD
};
=======
};
>>>>>>> upstream/main
