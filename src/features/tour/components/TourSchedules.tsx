/* eslint-disable @typescript-eslint/no-explicit-any */
import { EditorMCEController } from "@/components/editor/EditorMCEController";
import { useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaRegTrashCan,
  FaUpDownLeftRight,
} from "react-icons/fa6";
import Sortable from "sortablejs";

type TourSchedulesProps = {
  schedules: {
    id: `${string}-${string}-${string}-${string}-${string}`;
    title: string;
    description: string;
    isHidden: boolean;
  }[];
  setSchedules: React.Dispatch<
    React.SetStateAction<
      {
        id: `${string}-${string}-${string}-${string}-${string}`;
        title: string;
        description: string;
        isHidden: boolean;
      }[]
    >
  >;
};

export const TourSchedules = ({
  schedules,
  setSchedules,
}: TourSchedulesProps) => {
  const scheduleRef = useRef<any>(null);
  const listRef = useRef<any>(null);

  const handleAddSchedule = () => {
    setSchedules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        description: "",
        isHidden: false,
      },
    ]);
  };

  const handleToggleHidden = (index: number) => {
    setSchedules((prev) => {
      const updated = [...prev];
      updated[index].isHidden = !updated[index].isHidden;
      return updated;
    });
  };

  const handleDeleteSchedule = (index: number) => {
    if (schedules.length <= 1) return;
    setSchedules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChangeTitle = (index: number, value: string) => {
    setSchedules((prev) => {
      const updated = [...prev];
      updated[index].title = value;
      return updated;
    });
  };

  const handleChangeContent = (index: number, value: string) => {
    setSchedules((prev) => {
      const updated = [...prev];
      updated[index].description = value;
      return updated;
    });
  };

  // SortableJS
  useEffect(() => {
    if (!listRef.current) return;

    const sortable = Sortable.create(listRef.current, {
      animation: 150,
      handle: ".drag-handle",
      ghostClass: "opacity-40",

      onEnd: (evt: any) => {
        if (evt.oldIndex == null || evt.newIndex == null) return;

        setSchedules((prev) => {
          const newArr = [...prev];
          const [moved] = newArr.splice(evt.oldIndex, 1);
          newArr.splice(evt.newIndex, 0, moved);
          return newArr;
        });
      },
    });

    return () => sortable.destroy();
  }, []);

  return (
    <div className="col-span-1 md:col-span-2">
      <label className="text-travel-label mb-1 block text-sm font-medium">
        Lịch trình tour
      </label>
      <div ref={listRef} className="flex flex-col gap-4">
        {schedules.map((item, index) => (
          <div
            key={item.id}
            className="border-travel-four rounded-sm border bg-white p-5"
          >
            <div className="flex flex-wrap items-center gap-3.75">
              {item.isHidden && (
                <div className="bg-travel-three border-travel-four drag-handle flex h-12 w-12 cursor-move items-center justify-center rounded-sm border">
                  <FaUpDownLeftRight className="size-4 text-[#A6A6A6]" />
                </div>
              )}
              <input
                value={item.title}
                onChange={(event) =>
                  handleChangeTitle(index, event.target.value)
                }
                type="text"
                className="border-travel-four text-travel-secondary bg-travel-three order-1 h-12 w-full flex-none rounded-sm border px-4.5 text-sm font-medium sm:order-0 sm:flex-1"
              />
              <div
                onClick={() => handleDeleteSchedule(index)}
                className="bg-travel-three border-travel-four flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border"
              >
                <FaRegTrashCan className="text-error size-4" />
              </div>
              <div
                onClick={() => handleToggleHidden(index)}
                className="bg-travel-three border-travel-four flex h-12 w-12 cursor-pointer items-center justify-center rounded-sm border"
              >
                <FaChevronDown
                  className={`size-4 text-[#A6A6A6] transition-all duration-300 ${item.isHidden && "rotate-180"}`}
                />
              </div>
            </div>

            {!item.isHidden && (
              <div className="mt-4">
                <EditorMCEController
                  editorRef={(el: any) => (scheduleRef.current[item.id] = el)}
                  value={item.description}
                  id={`schedule-${item.id}`}
                  onChange={(v: string) => handleChangeContent(index, v)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddSchedule}
        type="button"
        className="bg-travel-gray text-travel-secondary mt-3.75 block h-10 cursor-pointer rounded-sm px-5 py-2.5 text-sm font-semibold"
      >
        + Thêm lịch trình
      </button>
    </div>
  );
};
