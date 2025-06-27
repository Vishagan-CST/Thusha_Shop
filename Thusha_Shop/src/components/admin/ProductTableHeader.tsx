
import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProductTableHeaderProps {
  onAddProduct: () => void;
}

const ProductTableHeader: React.FC<ProductTableHeaderProps> = ({ onAddProduct }) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
<<<<<<< HEAD
        <CardTitle>Product Management</CardTitle>
        <CardDescription>Manage your product inventory, categories, and pricing</CardDescription>
=======
        <CardTitle>Product List</CardTitle>
       
>>>>>>> upstream/main
      </div>
      <Button 
        onClick={onAddProduct}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Add Product
      </Button>
    </CardHeader>
  );
};

export default ProductTableHeader;
