// JavaScript để xử lý sự kiện khi form được submit
document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Ngăn chặn form submit mặc định

    // Lấy giá trị từ các trường input
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    var city = document.getElementById("city").value;
    var district = document.getElementById("district").value;

    // Xóa thông báo lỗi cũ (nếu có)
    clearErrors();

    // Kiểm tra định dạng số điện thoại
    var phonePattern = /^\d+$/;
    if (!phone.match(phonePattern)) {
        displayError("phoneError", "Số điện thoại không hợp lệ. Vui lòng nhập lại.");
    }

    var emailPattern = /^[a-zA-Z0-9._-]+@gmail.com$/; // Đúng định dạng @gmail.com
    if (!email.match(emailPattern)) {
        displayError("emailError", "Email không hợp lệ. Vui lòng nhập lại.");
    }


    // Kiểm tra chọn tỉnh / thành phố
    if (city === "") {
        displayError("cityError", "Vui lòng chọn tỉnh / thành phố.");
        return;
    }

    // Kiểm tra chọn quận / huyện
    if (district === "") {
        displayError("districtError", "Vui lòng chọn quận / huyện.");
        return;
    }

    // Hiển thị dữ liệu trong phần kết quả
    var result = document.getElementById("result");
    result.innerHTML = `
        <h3>Kết quả:</h3>
        <p>Số điện thoại: ${phone}</p>
        <p>Email: ${email}</p>
        <p>Tỉnh / Thành phố: ${cityMap[city]}</p>
        <p>Quận / Huyện: ${district}</p>
      `;



});


// Hàm để hiển thị thông báo lỗi
const displayError = (id, message) => {
    var errorSpan = document.getElementById(id);
    errorSpan.textContent = message;
    errorSpan.style.color = "red"; // Màu đỏ cho thông báo lỗi
}

// Hàm để xóa thông báo lỗi cũ
const clearErrors = () => {
    var errorSpans = document.querySelectorAll(".error");
    errorSpans.forEach((errorSpan) => {
        errorSpan.textContent = "";
    });
}

var cityMap = {
    "Hanoi": "Hà Nội",
    "HCMC": "TP. Hồ Chí Minh",
    "Danang": "Đà Nẵng"
};

// JavaScript để cập nhật danh sách quận / huyện dựa trên tỉnh / thành phố được chọn
document.getElementById("city").addEventListener("change", () => {
    var city = document.getElementById("city").value;
    var districtSelect = document.getElementById("district");

    // Xóa tất cả các option hiện tại
    districtSelect.innerHTML = "Chọn quận / huyện";

    // Tạo danh sách quận / huyện tương ứng với tỉnh / thành phố được chọn
    var districts = [];
    if (city === "Hanoi") {
        districts = [
            "Ba Đình", "Hoàn Kiếm", "Hai Bà Trưng",
            "Đống Đa", "Cầu Giấy", "Thanh Xuân",
            "Hoàng Mai", "Long Biên", "Tây Hồ",
            "Hà Đông", "Nam Từ Liêm", "Sơn Tây"
        ];
    } else if (city === "HCMC") {
        districts = [
            "Quận 1", "Quận 2", "Quận 3",
            "Quận 4", "Quận 5", "Quận 6",
            "Quận 7", "Quận 8", "Quận 9",
            "Quận 10", "Quận 11", "Quận 12",
            "Bình Thạnh", "Phú Nhuận", "Gò Vấp"
        ];
    } else if (city === "Danang") {
        districts = [
            "Hải Châu", "Thanh Khê", "Sơn Trà",
            "Ngũ Hành Sơn", "Cẩm Lệ", "Hòa Vang"
        ];
    }

    if (city === "") {
        districts = ["Chọn quận / huyện"]
    }

    // Thêm các option vào select
    for (var i = 0; i < districts.length; i++) {
        var option = document.createElement("option");
        option.value = districts[i];
        option.textContent = districts[i];
        districtSelect.appendChild(option);
    }
});