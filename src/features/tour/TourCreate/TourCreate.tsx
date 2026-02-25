/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { pathAdmin } from "@/config/path";
import { useCityList } from "../hooks/useCityList";
import { useAuthStore } from "@/stores/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { renderOptions } from "@/utils/renderOptions";
import { useTourCreate } from "../hooks/useTourCreate";
import { BaseInput } from "@/components/form/BaseInput";
import { tourSchema, type TourFormValues } from "@/types";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { BaseSelect } from "@/components/form/BaseSelect";
import { useCategoryList } from "@/hooks/useCategoryList";
import { TourSchedules } from "../components/TourSchedules";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { FileUploader } from "@/components/form/FileUploader";
import { useForm, type SubmitHandler } from "react-hook-form";
import { TourInputGroup } from "../components/TourInputGroup";
import { ButtonSubmit } from "@/components/form/ButtonSubmit";
import { ButtonBack } from "@/components/button/ActionButtons";
import { NoPermission } from "@/components/common/NoPermission";
import { FileMultiUploader } from "@/components/form/FileMultiUploader";
import { LocationCheckboxList } from "../components/LocationCheckboxList";

export const TourCreate = () => {
  const { data } = useCategoryList();
  const categoryTree = data?.categoryTree ?? [];
  const { cityList } = useCityList();
  const { account } = useAuthStore();
  const permissions = account?.permissions;

  const informationRef = useRef<any>(null);
  const [avatars, setAvatars] = useState<any[]>([]);
  const [images, setImages] = useState<any[]>([]);
  const [locationsFrom, setLocationsFrom] = useState<string[]>([]);
  const [locationsTo, setLocationsTo] = useState<string[]>([]);
  const [schedules, setSchedules] = useState([
    {
      id: crypto.randomUUID(),
      title: "",
      description: "",
      isHidden: false,
    },
  ]);

  const filteredSchedules = schedules
    .map(({ title, description }) => ({
      title,
      description,
    }))
    .filter(
      (item) => item.title.trim() !== "" || item.description.trim() !== "",
    );

  const handleToggleForm = (id: string) => {
    setLocationsFrom((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleToggleTo = (id: string) => {
    setLocationsTo((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema) as any,
  });

  const { mutate, isPending } = useTourCreate({
    reset,
    setAvatars,
    setImages,
    setLocationsFrom,
    setLocationsTo,
    setSchedules,
  });

  const onSubmit: SubmitHandler<TourFormValues> = (data) => {
    data.avatar = null;
    if (avatars.length > 0 && avatars[0].file instanceof File) {
      data.avatar = avatars[0].file;
    }

    data.information = "";
    if (informationRef.current) {
      data.information = informationRef.current.getContent();
    }

    data.locationsFrom = locationsFrom;

    data.locationsTo = locationsTo;

    data.schedules = [];
    if (filteredSchedules.length > 0) {
      data.schedules = filteredSchedules;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category || "");
    formData.append("position", String(data.position || ""));
    formData.append("status", data.status || "");
    formData.append("avatar", data.avatar);
    formData.append("priceAdult", String(data.priceAdult));
    formData.append("priceChildren", String(data.priceChildren));
    formData.append("priceBaby", String(data.priceBaby));
    formData.append("priceNewAdult", String(data.priceNewAdult));
    formData.append("priceNewChildren", String(data.priceNewChildren));
    formData.append("priceNewBaby", String(data.priceNewBaby));
    formData.append("stockAdult", String(data.stockAdult));
    formData.append("stockChildren", String(data.stockChildren));
    formData.append("stockBaby", String(data.stockBaby));
    formData.append("locationsFrom", JSON.stringify(data.locationsFrom));
    formData.append("locationsTo", JSON.stringify(data.locationsTo));
    formData.append("time", data.time || "");
    formData.append("vehicle", data.vehicle || "");
    formData.append("departureDate", data.departureDate || "");
    formData.append("information", data.information || "");
    formData.append("schedules", JSON.stringify(data.schedules));
    if (images.length > 0) {
      for (const image of images) {
        formData.append("images", image.file);
      }
    }

    mutate(formData);
  };

  return (
    <>
      {permissions?.includes("tour-create") ? (
        <>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <PageTitle title="Tạo tour" />
            <ButtonBack to={`/${pathAdmin}/tour/list`} />
          </div>
          <div className="border-travel-gray overflow-hidden rounded-sm border bg-white p-6">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <BaseInput
                id="name"
                label="Tên tour"
                register={register("name")}
                error={errors.name}
                isRequired
              />

              <BaseSelect
                id="category"
                label="Danh mục"
                register={register("category")}
                error={errors.category}
              >
                <option value="">-- Chọn danh mục --</option>
                {renderOptions(categoryTree)}
              </BaseSelect>

              <BaseInput
                id="position"
                label="Vị trí"
                type="number"
                register={register("position")}
                error={errors.position}
                placeholder="Note: Tự động tăng"
              />

              <BaseSelect
                id="status"
                label="Trạng thái"
                register={register("status")}
                error={errors.status}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Tạm dừng</option>
              </BaseSelect>

              <FileUploader
                id="avatar"
                label="Ảnh đại diện"
                files={avatars}
                setFiles={setAvatars}
              />

              <FileMultiUploader
                id="images"
                label="Danh sách ảnh"
                files={images}
                setFiles={setImages}
              />

              <TourInputGroup
                title="Giá cũ"
                namePrefix="price"
                register={register}
              />

              <TourInputGroup
                title="Giá mới"
                namePrefix="priceNew"
                register={register}
              />

              <TourInputGroup
                title="Còn lại"
                namePrefix="stock"
                register={register}
              />

              <div className="col-span-1 flex flex-col gap-1 md:col-span-2">
                <label className="text-travel-label block text-sm font-medium">
                  Thông tin tour
                </label>

                <EditorMCE
                  id="description"
                  value=""
                  editorRef={informationRef}
                />
              </div>

              <LocationCheckboxList
                label="Điểm khởi hành"
                cityList={cityList}
                selectedValues={locationsFrom}
                onToggle={handleToggleForm}
              />

              <LocationCheckboxList
                label="Điểm đến"
                cityList={cityList}
                selectedValues={locationsTo}
                onToggle={handleToggleTo}
              />

              <BaseInput
                id="time"
                label="Thời gian"
                register={register("time")}
                error={errors.time}
                placeholder="Ví dụ: 3N2Đ"
              />

              <BaseInput
                id="vehicle"
                label="Phương tiện"
                register={register("vehicle")}
                error={errors.vehicle}
                placeholder="Ví dụ: Xe, Máy bay"
              />

              <BaseInput
                id="departureDate"
                label="Ngày khởi hành"
                register={register("departureDate")}
                error={errors.departureDate}
                type="date"
              />

              <TourSchedules
                schedules={schedules}
                setSchedules={setSchedules}
              />

              <ButtonSubmit isPending={isPending} text="Tạo mới" />
            </form>
          </div>
        </>
      ) : (
        <NoPermission />
      )}
    </>
  );
};
