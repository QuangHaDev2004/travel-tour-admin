/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { pathAdmin } from "@/config/path";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { tourFormSchema, type TourFormInputs } from "@/types";
import { PageTitle } from "@/components/pageTitle/PageTitle";
import { FormInput } from "@/components/form/FormInput";
import { ButtonSubmit } from "@/components/button/ButtonSubmit";
import { ContextLink } from "@/components/common/ContextLink";
import { TourSchedules } from "./components/TourSchedules";
import { renderOptions } from "@/utils/renderOptions";
import { useCategoryList } from "../../hooks/useCategoryList";
import { EditorMCE } from "@/components/editor/EditorMCE";
import { useCityList } from "./hooks/useCityList";
import { useParams } from "react-router";
import { useTourDetail } from "./hooks/useTourDetail";
import { useTourEdit } from "./hooks/useTourEdit";
import { FileMultiUploader } from "@/components/form/FileMultiUploader";
import { FileUploader } from "@/components/form/FileUploader";
import { tourSchema, type TourFormValues } from "@/types";

export const TourEdit = () => {
  const { id } = useParams();
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
  const { data } = useCategoryList();
  const categoryTree = useMemo(
    () => data?.categoryTree ?? [],
    [data?.categoryTree],
  );
  const { cityList } = useCityList();
  const { tourDetail } = useTourDetail(id!);
  const { mutate: mutateTourEdit, isPending: isPendingTourEdit } = useTourEdit({
    id: id!,
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TourFormValues>({
    resolver: zodResolver(tourSchema) as any,
  });

  useEffect(() => {
    if (tourDetail && categoryTree.length > 0) {
      reset({
        ...tourDetail,
        departureDate: tourDetail.departureDateFormat,
      });
    }

    if (tourDetail.locationsFrom && tourDetail.locationsFrom.length > 0) {
      setLocationsFrom(tourDetail.locationsFrom);
    }

    if (tourDetail.locationsTo && tourDetail.locationsTo.length > 0) {
      setLocationsTo(tourDetail.locationsTo);
    }

    if (tourDetail.schedules && tourDetail.schedules.length > 0) {
      const schedulesConvert = tourDetail.schedules.map((item) => ({
        id: crypto.randomUUID(),
        title: item.title,
        description: item.description,
        isHidden: false,
      }));

      setSchedules(schedulesConvert);
    }

    if (tourDetail && tourDetail.avatar) {
      setAvatars([{ source: tourDetail.avatar }]);
    }

    if (tourDetail?.images && tourDetail?.images.length > 0) {
      const listImage = tourDetail.images.map((url: string) => ({
        source: url,
      }));
      setImages(listImage);
    }
  }, [categoryTree, reset, tourDetail]);

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

  const handleTourForm: SubmitHandler<TourFormValues> = (data) => {
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
        if (image.file instanceof File) {
          formData.append("images", image.file);
        } else {
          formData.append("images", image.source);
        }
      }
    }

    mutateTourEdit(formData);
  };

  // if(isPendingTourDetail) return <div className="">Đang tải dữ liệu...</div>

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <PageTitle title="Chỉnh sửa tour" />
        <ContextLink text="Quay lại danh sách" to={`/${pathAdmin}/tour/list`} />
      </div>
      <div className="border-travel-secondary/20 overflow-hidden rounded-md border bg-white p-6 shadow-md">
        <form
          onSubmit={handleSubmit(handleTourForm)}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <FormInput
            id="name"
            label="Tên tour"
            register={register("name")}
            error={errors.name}
            isRequired
          />

          <div>
            <label
              htmlFor="category"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Danh mục
            </label>
            <select
              {...register("category")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="">-- Chọn danh mục --</option>
              {renderOptions(categoryTree)}
            </select>
          </div>

          <FormInput
            id="position"
            label="Vị trí"
            type="number"
            register={register("position")}
            error={errors.position}
            placeholder="Note: Tự động tăng"
          />

          <div>
            <label
              htmlFor="status"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Trạng thái
            </label>
            <select
              {...register("status")}
              className="select bg-travel-three text-travel-secondary h-12 w-full px-5 text-sm font-medium"
            >
              <option value="active">Hoạt động</option>
              <option value="inactive">Tạm dừng</option>
            </select>
          </div>

          {/* <FormFileUpload
            name="avatar"
            label="Ảnh đại diện"
            files={avatars}
            setFiles={setAvatars}
          /> */}

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

          <div>
            <label
              htmlFor="priceOld"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Giá cũ
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceAdult"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Người lớn
                </label>
                <input
                  {...register("priceAdult")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceChildren"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Trẻ em
                </label>
                <input
                  {...register("priceChildren")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceBaby"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Em bé
                </label>
                <input
                  {...register("priceBaby")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="priceNew"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Giá mới
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceNewAdult"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Người lớn
                </label>
                <input
                  {...register("priceNewAdult")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceNewChildren"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Trẻ em
                </label>
                <input
                  {...register("priceNewChildren")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="priceNewBaby"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Em bé
                </label>
                <input
                  {...register("priceNewBaby")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                  autoComplete="off"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="stock"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Còn lại
            </label>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-5">
                <label
                  htmlFor="stockAdult"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Người lớn
                </label>
                <input
                  {...register("stockAdult")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="stockChildren"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Trẻ em
                </label>
                <input
                  {...register("stockChildren")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>
              <div className="flex items-center gap-5">
                <label
                  htmlFor="stockBaby"
                  className="text-travel-label mb-1 block w-[89px] text-sm font-semibold"
                >
                  Em bé
                </label>
                <input
                  {...register("stockBaby")}
                  type="number"
                  className="border-travel-secondary/20 bg-travel-three text-travel-secondary h-12 flex-1 rounded-sm border px-5 text-sm font-medium"
                  onWheel={(e) => e.currentTarget.blur()}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <label
              htmlFor="description"
              className="text-travel-label mb-1 block text-sm font-semibold"
            >
              Thông tin tour
            </label>
            <EditorMCE
              editorRef={informationRef}
              value={tourDetail.information}
              id="description"
            />
          </div>

          <div>
            <label className="text-travel-label mb-1 block text-sm font-semibold">
              Điểm khởi hành
            </label>
            <div className="border-travel-four bg-travel-three flex h-[166px] flex-col gap-2 overflow-y-auto rounded-sm border px-[23px] py-[14px]">
              {cityList.map((item: { _id: string; name: string }) => (
                <label
                  key={item._id}
                  className="label text-travel-secondary flex items-center gap-3 text-sm font-medium"
                >
                  <input
                    checked={locationsFrom.includes(item._id)}
                    onChange={() => handleToggleForm(item._id)}
                    type="checkbox"
                    className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-md"
                    value={item._id}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-travel-label mb-1 block text-sm font-semibold">
              Điểm đến
            </label>
            <div className="border-travel-four bg-travel-three flex h-[166px] flex-col gap-2 overflow-y-auto rounded-sm border px-[23px] py-[14px]">
              {cityList.map((item: { _id: string; name: string }) => (
                <label
                  key={item._id}
                  className="label text-travel-secondary flex items-center gap-3 text-sm font-medium"
                >
                  <input
                    checked={locationsTo.includes(item._id)}
                    onChange={() => handleToggleTo(item._id)}
                    type="checkbox"
                    className="checkbox checkbox-primary border-travel-secondary/20 hover:border-travel-primary h-5 w-5 rounded-md"
                    value={item._id}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>

          <FormInput
            id="time"
            label="Thời gian"
            register={register("time")}
            error={errors.time}
            placeholder="Ví dụ: 3N2Đ"
          />

          <FormInput
            id="Phương tiện"
            label="Phương tiện"
            register={register("vehicle")}
            error={errors.vehicle}
            placeholder="Ví dụ: Xe, Máy bay"
          />

          <FormInput
            id="departureDate"
            label="Ngày khởi hành"
            register={register("departureDate")}
            error={errors.departureDate}
            type="date"
          />

          <TourSchedules schedules={schedules} setSchedules={setSchedules} />

          <ButtonSubmit isPending={isPendingTourEdit} text="Cập nhật" />
        </form>
      </div>
    </>
  );
};
