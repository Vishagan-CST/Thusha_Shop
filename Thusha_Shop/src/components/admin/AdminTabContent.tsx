<<<<<<< HEAD

=======
>>>>>>> upstream/main
import React from "react";
import { useAdminDashboard } from "@/context/AdminDashboardContext";
import { useUser } from "@/context/UserContext";
import { TabsContent } from "@/components/ui/tabs";
import { StaffAccountReceiverProps } from "./StaffAccountManager";

// Import dashboard components
import DashboardOverview from "@/components/admin/DashboardOverview";
import OrdersTable from "@/components/admin/OrdersTable";
import ProductsTable from "@/components/admin/ProductsTable";
import AppointmentsTable from "@/components/admin/AppointmentsTable";
import CustomersTable from "@/components/admin/CustomersTable";
import ProfileSettings from "@/components/admin/ProfileSettings";
<<<<<<< HEAD

// Import mock data
import { mockCustomers, salesData, categoryData } from "@/components/admin/mockData";
=======
import ContactUsTable from "@/components/admin/ContactUsTable";

// Import mock data
import {
  mockCustomers,
  salesData,
  categoryData,
} from "@/components/admin/mockData";
>>>>>>> upstream/main

interface AdminTabContentProps extends StaffAccountReceiverProps {
  viewMode: "list" | "grid";
  setActiveTab: (tab: string) => void;
}

<<<<<<< HEAD
const AdminTabContent: React.FC<AdminTabContentProps> = ({ 
  viewMode, 
  setActiveTab,
  onCreateStaffAccount 
}) => {
  const { user } = useUser();
  const { 
    orders, 
    products, 
    appointments, 
=======
const AdminTabContent: React.FC<AdminTabContentProps> = ({
  viewMode,
  setActiveTab,
  onCreateStaffAccount,
}) => {
  const { user } = useUser();
  const {
    orders,
    products,
    appointments,
>>>>>>> upstream/main
    stats,
    updateOrderStatus,
    deleteOrder,
    updateAppointmentStatus,
    deleteAppointment,
<<<<<<< HEAD
    updateStock,
    deleteProduct,
    addProduct
  } = useAdminDashboard();
  
  const handleUpdateAppointmentStatus = (appointmentId: string, newStatus: string) => {
=======

    updateStock,
    deleteProduct,
    addProduct,
    updateProduct,

    accessories,
    updateAccessory,
    addAccessory,
    deleteAccessory,
    updateAccessoryStock,

  } = useAdminDashboard();

  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/messages/");
        const data = await response.json();
        setContacts(data);
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
      }
    };

    fetchContacts();
  }, []);

  const handleUpdateAppointmentStatus = (
    appointmentId: string,
    newStatus: string
  ) => {
>>>>>>> upstream/main
    // Only doctors can update appointment status
    if (user?.role === "admin") {
      return;
    }
<<<<<<< HEAD
    
=======

>>>>>>> upstream/main
    updateAppointmentStatus(appointmentId, newStatus);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    // Only doctors can delete appointments
    if (user?.role === "admin") {
      return;
    }
<<<<<<< HEAD
    
=======

>>>>>>> upstream/main
    deleteAppointment(appointmentId);
  };

  const handleAssignDelivery = (orderId: string, deliveryPerson: string) => {
    // Handle delivery assignment logic here
    console.log(`Assigning order ${orderId} to ${deliveryPerson}`);
  };

  return (
    <>
      <TabsContent value="overview">
<<<<<<< HEAD
        <DashboardOverview 
=======
        <DashboardOverview
>>>>>>> upstream/main
          viewMode={viewMode}
          stats={stats}
          orders={orders}
          products={products}
          appointments={appointments}
          salesData={salesData}
          categoryData={categoryData}
          setActiveTab={setActiveTab}
        />
      </TabsContent>
<<<<<<< HEAD
      
      <TabsContent value="orders">
        <OrdersTable 
          orders={orders} 
          onUpdateOrderStatus={updateOrderStatus} 
=======

      <TabsContent value="orders">
        <OrdersTable
          orders={orders}
          onUpdateOrderStatus={updateOrderStatus}
>>>>>>> upstream/main
          onDeleteOrder={deleteOrder}
          onAssignDelivery={handleAssignDelivery}
        />
      </TabsContent>
<<<<<<< HEAD
      
      <TabsContent value="products">
        <ProductsTable 
          products={products} 
          onUpdateStock={updateStock} 
          onDeleteProduct={deleteProduct}
          onAddProduct={addProduct}
        />
      </TabsContent>
      
      <TabsContent value="appointments">
        <AppointmentsTable 
          appointments={appointments} 
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus} 
          onDeleteAppointment={handleDeleteAppointment} 
          onCreateStaffAccount={onCreateStaffAccount} 
        />
      </TabsContent>
      
      <TabsContent value="customers">
        <CustomersTable 
          customers={mockCustomers} 
          onCreateStaffAccount={onCreateStaffAccount} 
        />
      </TabsContent>
      
=======

      <TabsContent value="products">
        <ProductsTable
          products={products}
          onUpdateStock={updateStock}
          onDeleteProduct={deleteProduct}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}

          accessories={accessories}
          onUpdateAccessoryStock={updateAccessoryStock}
          onDeleteAccessory={deleteAccessory}
          onAddAccessory={addAccessory}
          onUpdateAccessory={updateAccessory}
        />
      </TabsContent>

      <TabsContent value="appointments">
        <AppointmentsTable
          appointments={appointments}
          onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
          onDeleteAppointment={handleDeleteAppointment}
          onCreateStaffAccount={onCreateStaffAccount}
        />
      </TabsContent>

      <TabsContent value="customers">
        <CustomersTable
          customers={mockCustomers}
          onCreateStaffAccount={onCreateStaffAccount}
        />
      </TabsContent>
      <TabsContent value="contactus">
        <ContactUsTable contacts={contacts} />
      </TabsContent>

>>>>>>> upstream/main
      <TabsContent value="settings">
        <ProfileSettings />
      </TabsContent>
    </>
  );
};

// Add static propTypes to help with dynamic prop checking
AdminTabContent.propTypes = {
<<<<<<< HEAD
  onCreateStaffAccount: () => null
=======
  onCreateStaffAccount: () => null,
>>>>>>> upstream/main
};

export default AdminTabContent;
