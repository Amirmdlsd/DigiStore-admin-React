import Swal from "sweetalert2";

export default function DeleteAlert({ title, func }) {
  return Swal.fire({
    title: title,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "بله",
    cancelButtonText: "خیر",
  }).then((result) => {
    func();
    if (result.isConfirmed) {
      func();
      Swal.fire({
        title: "با موفقیت حذف شد",
        icon: "success",
      });
    }
  });
}
