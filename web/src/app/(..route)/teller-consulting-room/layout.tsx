import TellerConsultingRoomSideBar from "@/app/ui/consulting-room/teller-consulting-room-side-bar";

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <div className="flex h-screen flex-row overflow-hidden">
      <div className="w-[70%]  overflow-y-auto">{children}</div>
      <div className="w-[30%] overflow-x-auto bg-hwachang-darkgreen">
        <TellerConsultingRoomSideBar />
      </div>
    </div>
  );
}