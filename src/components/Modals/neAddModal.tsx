import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  Chip,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Image,
  Textarea,
} from "@nextui-org/react";
import { postData } from "@/core/apiHandler";

interface AddModalProps {
  title: string;
  generateRandomId: () => any;
  columns: any;
}

export default function AddModal({
  title,
  generateRandomId,
  columns,
}: AddModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [uploadImageUrl, setUploadImageUrl] = useState("/01.png");
  const [uploadImageUrlArr, setUploadImageUrlArr] = useState<string[]>(
    Array(5).fill("/01.png")
  );
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<FileList | any>(Array(5).fill(null));
  const [tabs, setTabs] = useState<string[]>([]);
  const [service, setService] = useState<string>("");
  const [serviceArr, setServiceArr] = useState<string[]>([]);

  const pushTabs = (tab: string) => {
    const tabsArr = [...tabs];
    tabsArr.push(tab);
    setTabs(tabsArr);
  };

  const removeTab = (index: number): void => {
    const tabsArr = [...tabs];
    const updatedServiceArr = [...serviceArr];
    updatedServiceArr.splice(index, 1);
    tabsArr.splice(index, 1);
    setTabs(tabsArr);
    setServiceArr(updatedServiceArr);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("No file uploaded");
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleMultipleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      alert("No file uploaded");
      return;
    }

    const files: FileList = e.target.files;
    console.log(files);
    const newFiles: File[] = Array.from(files);
    setFiles(newFiles);

    const filesToUpload = newFiles.slice(0, 5);

    const urls: string[] = [];

    Promise.all(
      filesToUpload.map((file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<string>((resolve, reject) => {
          reader.onloadend = () => {
            const url = reader.result as string;
            urls.push(url);
            resolve(url);
          };

          reader.onerror = reject;
        });
      })
    )
      .then(() => {
        setUploadImageUrlArr(urls);
      })
      .catch((error) => {
        console.error("Error reading files:", error);
      });
  };

  const handleSubmit = async (e: any, close: () => void) => {
    e.preventDefault();
    setSubmitting(true);
    const formElement = e.target as HTMLFormElement;
    const inputs = formElement.querySelectorAll("input, textarea");
    const data: any = {};

    inputs.forEach((input: any) => {
      const name = input.name;
      const value = input.value;
      console.log(inputs, value);
      if (name !== "" && name !== "main image") {
        data[name] = value;
      }
    });

    const hasImageColumn = columns.some(
      (column: any) => column.type === "image"
    );
    const hasImagesColumn = columns.some(
      (column: any) => column.type === "images"
    );

    if (hasImageColumn && !file) {
      alert("Please select an image");
      setSubmitting(false);
      return;
    }
    if (hasImagesColumn && files.every((file: any) => file === null)) {
      alert("Please select at least one image");
      setSubmitting(false);
      return;
    }

    const current_time = new Date().getTime();

    // if (hasImageColumn && file) {
    //   const image_upload_resp = await uploadImage(
    //     file,
    //     `${title}/${
    //       data.name ?? data.heading ?? data.title ?? data.position
    //     }-${current_time}`
    //   );
    //   if (!image_upload_resp.status) {
    //     alert("Image upload failed");
    //     setSubmitting(false);
    //     return;
    //   }
    //   data.image = image_upload_resp.data;
    // }

    // if (hasImagesColumn) {
    //   if (files.length > 0) {
    //     const images_upload_resp = await multipleUpload(
    //       files,
    //       `${title}/${data.name ?? data.heading ?? data.title}-${current_time}`
    //     );
    //     if (!images_upload_resp.status) {
    //       alert("Multiple image upload failed");
    //       setSubmitting(false);
    //       return;
    //     }
    //     data.images = images_upload_resp.data;
    //   }
    // }

    if (serviceArr.length > 0) {
      data.projectDetails = serviceArr;
    }
    console.log(data);
    const resp = await postData(title, data, {});
    if (!resp.status) {
      alert("Data upload failed");
      setServiceArr([]);
      setUploadImageUrlArr(Array(5).fill(""));
    } else {
      alert("Data uploaded successfully");
      generateRandomId();
      setServiceArr([]);
      setUploadImageUrlArr(Array(5).fill("/01.png"));
      setSubmitting(false);
      setUploadImageUrl("/01.png");
      close();
    }
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-violet-700 text-white"
      >{`Add ${title}`}</Button>
      <Modal
        isDismissable={false}
        isOpen={isOpen}
        scrollBehavior="inside"
        onOpenChange={onOpenChange}
        placement="top-center"
        className="overflow-y-scroll"
        onClose={() => {
          setServiceArr([]);
          setUploadImageUrlArr(Array(5).fill("/01.png"));
          setUploadImageUrl("/01.png");
          setSubmitting(false);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form
                onSubmit={(e) => {
                  handleSubmit(e, onClose);
                }}
              >
                <ModalHeader className="flex flex-col gap-1">{`Add ${title}`}</ModalHeader>
                <ModalBody>
                  {columns.map((column: any, columnIndex: number) => {
                    switch (column.type) {
                      case "text":
                        return (
                          <Input
                            key={columnIndex}
                            label={column.name}
                            name={column.name.toLowerCase()}
                            placeholder={column.name}
                            required
                          />
                        );
                      case "image":
                        return (
                          <div key={columnIndex}>
                            <label htmlFor={`${title}-image-${columnIndex}`}>
                              <Image
                                className="cursor-pointer"
                                src={uploadImageUrl}
                                alt="upload"
                                width={200}
                                height={200}
                              />
                            </label>
                            <input
                              className="hidden"
                              id={`${title}-image-${columnIndex}`}
                              placeholder="Image"
                              required
                              type="file"
                              multiple={false}
                              accept="image/*"
                              onChange={handleChange}
                            />
                          </div>
                        );
                      case "textbox":
                        return (
                          <Textarea
                            key={columnIndex}
                            label={column.name}
                            name={column.name.toLowerCase()}
                            placeholder={column.name}
                            required
                          />
                        );
                      case "action":
                        return null;
                      case "images":
                        return (
                          <div key={columnIndex}>
                            <h1>{column.name}</h1>
                            <label>
                              <div className="flex w-full flex-row gap-4 overflow-x-scroll">
                                {uploadImageUrlArr.map(
                                  (uploadImg: any, imgIndex: any) => (
                                    <div key={imgIndex}>
                                      <label
                                        htmlFor={`${title}-multiple-image`}
                                      >
                                        <Image
                                          className="cursor-pointer"
                                          src={uploadImg}
                                          alt="upload"
                                          key={imgIndex}
                                          width={400}
                                          height={400}
                                        />
                                      </label>
                                    </div>
                                  )
                                )}
                                <input
                                  id={`${title}-multiple-images`}
                                  name={column.name.toLowerCase()}
                                  placeholder="Images"
                                  type="file"
                                  max={5}
                                  multiple={true}
                                  accept="image/png image/jpeg"
                                  onChange={(e) => handleMultipleChange(e)}
                                />
                              </div>
                            </label>
                          </div>
                        );
                      case "tabselect":
                        return (
                          <div
                            className="flex flex-col gap-4 justify-around"
                            key={columnIndex}
                          >
                            <div className="flex flex-row gap-2">
                              {tabs.map(
                                (tab, tabIndex) =>
                                  tab !== "" && (
                                    <Chip
                                      variant="flat"
                                      color="warning"
                                      onClose={() => removeTab(tabIndex)}
                                      key={tabIndex}
                                    >
                                      {tab}
                                    </Chip>
                                  )
                              )}
                            </div>
                            <div className="flex flex-row justify-around">
                              <Input
                                required
                                className="w-1/2"
                                value={service}
                                placeholder={column.name}
                                type="text"
                                onChange={(e) => setService(e.target.value)}
                              />
                              <Button
                                color="primary"
                                onClick={() => {
                                  pushTabs(service);
                                  setServiceArr([...serviceArr, service]);
                                  setService("");
                                }}
                              >
                                Add
                              </Button>
                            </div>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="flat"
                    onPress={() => {
                      setServiceArr([]);
                      setUploadImageUrlArr(Array(5).fill("/01.png"));
                      onClose();
                    }}
                  >
                    Close
                  </Button>
                  <Button
                    isLoading={submitting}
                    color="secondary"
                    type="submit"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
