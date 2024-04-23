"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { therapistsData } from "@/constants/therapistsData";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { IoClipboardOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="max-h-[600px] overflow-y-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-4">
      {therapistsData.map((item, index) => (
        <Modal key={index} item={item}>
          <Card className="p-4 bg-white shadow-md rounded-xl mx-10 my-4">
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <Avatar className="w-24 h-24">
                <AvatarImage
                  src="/assets/default.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="p-4">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <p className="text-gray-500 text-md">
                  Experience: {item.experience}
                </p>
                <p className="text-gray-200  text-lg font-bold">
                  Cost: {item.cost}
                </p>
              </div>
            </div>
          </Card>
        </Modal>
      ))}
    </div>
  );
};

const Modal = ({ children, item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a notification or feedback here
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className="text-white">
        {children}
      </DialogTrigger>
      <DialogContent className="w-full max-w-2xl">
        <DialogTitle className="text-2xl text-custom-pink font-medium text-center">
          Therapist Details
        </DialogTitle>
        <DialogDescription className="text-gray-500 text-center">
          {/* Add any additional information about the card here */}
        </DialogDescription>
        <Card className="p-4 bg-white rounded-xl mx-10 border-none">
          <div className="flex flex-col items-center gap-4 lg:flex-row">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="p-4">
              <h2 className="text-2xl font-semibold">{item.name}</h2>
              <p className="text-gray-500 text-md">Age: {item.age}</p>
              <p className="text-gray-500 text-md">
                Experience: {item.experience}
              </p>
              <p className="text-gray-200 text-lg font-bold">
                Cost: {item.cost}
              </p>
              <div className="flex items-center gap-2"></div>
            </div>
          </div>
          <div className="flex items-center  gap-4">
            <p className="text-custom-pink font-semibold text-xl">Email: {item.email}</p>
            <IoClipboardOutline
              className="w-6 h-6 "
              onClick={() => copyToClipboard(item.email)}
            />
          </div>
        </Card>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Page;
