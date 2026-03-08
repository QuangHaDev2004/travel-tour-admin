/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { websiteInfoSchema, type WebsiteInfoInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { useWebsiteInfoEdit } from "../hooks/useWebsiteInfoEdit";
import { useWebsiteInfoDetail } from "../hooks/useWebsiteInfoDetail";
import { ButtonBack } from "@/components/button/ActionButtons";
import { BaseInput } from "@/components/form/BaseInput";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { FileUploader } from "@/components/form/FileUploader";

export const SettingWebsiteInfo = () => {
  const { mutate: mutateWebsiteInfoEdit, isPending: isPendingWebsiteInfoEdit } =
    useWebsiteInfoEdit();
  const { websiteInfoDetail } = useWebsiteInfoDetail();

  const [logos, setLogos] = useState<any[]>([]);
  const [favicons, setFavicons] = useState<any[]>([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<WebsiteInfoInputs>({
    resolver: zodResolver(websiteInfoSchema),
  });

  useEffect(() => {
    if (websiteInfoDetail) {
      reset({
        ...websiteInfoDetail,
      });
    }

    if (websiteInfoDetail && websiteInfoDetail.logo) {
      setLogos([
        {
          source: websiteInfoDetail.logo,
        },
      ]);
    }

    if (websiteInfoDetail && websiteInfoDetail.favicon) {
      setFavicons([
        {
          source: websiteInfoDetail.favicon,
        },
      ]);
    }
  }, [reset, websiteInfoDetail]);

  const handleWebsiteInfoForm: SubmitHandler<WebsiteInfoInputs> = (data) => {
    data.logo = null;
    if (logos.length > 0 && logos[0].file instanceof File) {
      data.logo = logos[0].file;
    }

    data.favicon = null;
    if (favicons.length > 0 && favicons[0].file instanceof File) {
      data.favicon = favicons[0].file;
    }

    const formData = new FormData();
    formData.append("websiteName", data.websiteName);
    formData.append("phone", data.phone);
    formData.append("email", data.email);
    formData.append("address", data.address || "");
    formData.append("facebook", data.facebook || "");
    formData.append("zalo", data.zalo || "");
    formData.append("logo", data.logo);
    formData.append("favicon", data.favicon);

    mutateWebsiteInfoEdit(formData);
  };

  return (
    <>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Thông tin website" />
        <ButtonBack />
      </div>
      <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
        {websiteInfoDetail && (
          <form
            onSubmit={handleSubmit(handleWebsiteInfoForm)}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            <BaseInput
              id="websiteName"
              label="Tên website"
              register={register("websiteName")}
              error={errors.websiteName}
              isRequired
            />

            <BaseInput
              id="phone"
              label="Số điện thoại"
              register={register("phone")}
              error={errors.phone}
            />

            <BaseInput
              id="email"
              label="Email"
              register={register("email")}
              error={errors.email}
            />

            <BaseInput
              id="address"
              label="Địa chỉ"
              register={register("address")}
              error={errors.address}
            />

            <BaseInput
              id="facebook"
              label="Link Facebook"
              register={register("facebook")}
              error={errors.facebook}
            />

            <BaseInput
              id="zalo"
              label="Link Zalo"
              register={register("zalo")}
              error={errors.zalo}
            />

            <FileUploader
              id="logo"
              label="Logo"
              files={logos}
              setFiles={setLogos}
              oneCol
            />

            <FileUploader
              id="favicon"
              label="Favicon"
              files={favicons}
              setFiles={setFavicons}
              oneCol
            />

            <ButtonSubmit
              text="Cập nhật"
              isPending={isPendingWebsiteInfoEdit}
            />
          </form>
        )}
      </div>
    </>
  );
};
