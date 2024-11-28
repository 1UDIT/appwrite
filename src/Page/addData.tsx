import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
    Dialog,
    DialogTrigger,
    DialogDescription
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea";
import { uploadImageAndCreateDocument } from "@/lib/UploadFile";
import { useState } from "react";

interface openProps {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function addData({ setOpen }: openProps) {
    const [file, setFile] = useState();
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');

    function handleChange(event:any) {
        setFile(event.target.files[0])
      }

    const handleUpload = async () => {
        if (!file || !topic || !description) {
            alert('Please fill out all fields and select a file.');
            return;
        }

        await uploadImageAndCreateDocument({file, topic, description});
        alert('File uploaded and document created!');
    };

    return (
        <DialogContent className="sm:max-w-[425px]" onOpenAutoFocus={(e) => e.preventDefault()} onInteractOutside={(e) => e.preventDefault()} onEscapeKeyDown={() => setOpen(false)}>
            <DialogHeader className="pb-4">
                <DialogTitle className="text-black"> Event Details</DialogTitle>
                <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Image
                    </Label>
                    <Input type="file" accept="image/*" onChange={handleChange} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Topic
                    </Label>
                    <Input
                        type="text"
                        placeholder="Enter topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                        Description
                    </Label>
                    <Textarea
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <Button onClick={handleUpload}>Upload and Create</Button>
            </div>
        </DialogContent>
    )
}
