CREATE DATABASE AssetManagementSystem;

USE AssetManagementSystem;

CREATE TABLE AssetCategories(
	CategoryID INT PRIMARY KEY IDENTITY(1, 1),
	CategoryName nvarchar(max) NOT NULL,
	CategoryDescription nvarchar(max)
)

CREATE TABLE AssetCatalogue(
	AssetID INT PRIMARY KEY IDENTITY(1, 1),
	AssetName nvarchar(max) NOT NULL,
	AssetCategory INT FOREIGN KEY REFERENCES AssetCategories(CategoryID) ON DELETE CASCADE ON UPDATE CASCADE,
	AssetModel nvarchar(max) NOT NULL,
	AssetSpecifications nvarchar(max),
	AssetImage nvarchar(max),
	AssetDescription nvarchar(max),
	AssetStatus nvarchar(50) NOT NULL,
	ManufacturingDate DATE,
	ExpiryDate DATE,
	AssetValue DECIMAL NOT NULL,
)

CREATE TABLE Employees(
	EmployeeID INT PRIMARY KEY IDENTITY(1, 1),
	EmployeeName nvarchar(max) NOT NULL,
	EmployeeEmail nvarchar(max) NOT NULL,
	EmployeeUsername nvarchar(max) NOT NULL,
	EmployeePassword nvarchar(max) NOT NULL,
	EmployeeGender nvarchar(50),
	EmployeeContactNumber nvarchar(50),
	EmployeeAddress nvarchar(max),
)

CREATE TABLE Admins(
	AdminID INT PRIMARY KEY IDENTITY(1, 1),
	AdminName nvarchar(max) NOT NULL,
	AdminEmail nvarchar(max),
	AdminUsername nvarchar(max) NOT NULL,
	AdminPassword nvarchar(max),
	AdminGender nvarchar(50),
	AdminContactNumber nvarchar(50),
	AdminAddress nvarchar(max)
)

CREATE TABLE AssetBorrowAndReturnRequests(
	RequestID INT PRIMARY KEY IDENTITY(1, 1),
	EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AdminID INT FOREIGN KEY REFERENCES Admins(AdminID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL, --Randomly assigned to an admin
	AssetID INT FOREIGN KEY REFERENCES AssetCatalogue(AssetID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AssetRequestType nvarchar(100) CHECK (AssetRequestType IN ('Borrow', 'Return')) NOT NULL,
	AssetAllocationFrom DATE, --can be null for asset return requests
	AssetAllocationTill DATE, --can be null for return requests
	AssetCount INT NOT NULL CHECK (AssetCount > 0),
	RequestDetails nvarchar(max)
)

CREATE TABLE AssetAllocationDetails(
	AssetAllocationID INT PRIMARY KEY IDENTITY(1, 1),
	EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AssetID INT FOREIGN KEY REFERENCES AssetCatalogue(AssetID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AssetCount INT NOT NULL CHECK (AssetCount > 0),
	AllocationDetails nvarchar(max),
	AssetAllocatedFrom DATE NOT NULL, --cannot be null
	AssetAllocatedTill Date, --can be null
	AllocationStatus nvarchar(50) CHECK (AllocationStatus IN ('Allocated', 'De-allocated'))
)

CREATE TABLE AssetServiceRequests(
	RequestID INT PRIMARY KEY IDENTITY(1, 1),
	EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AssetID INT FOREIGN KEY REFERENCES AssetCatalogue(AssetID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	IssueType nvarchar(max) CHECK (IssueType IN ('Malfunction', 'Repair')),
	RequestDetails nvarchar(max),
	RequestStatus nvarchar(50) CHECK (RequestStatus in ('Open', 'Closed', 'Servicing', 'Rejected'))
)

CREATE TABLE AssetAuditReportRequests(
	RequestID INT PRIMARY KEY IDENTITY(1, 1),
	EmployeeID INT FOREIGN KEY REFERENCES Employees(EmployeeID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	AssetID INT FOREIGN KEY REFERENCES AssetCatalogue(AssetID) ON DELETE CASCADE ON UPDATE CASCADE NOT NULL,
	RequestDetails nvarchar(max),
	RequestStatus nvarchar(50) CHECK (RequestStatus in ('Pending', 'Verified', 'Rejected'))
)

INSERT INTO AssetCategories VALUES
	('Desktop PC', 'Desktop PC'),
	('Laptop', 'Laptop'),
	('Furniture', 'Furniture'),
	('Car', 'Car'),
	('Gadgets', 'Gadgets')

INSERT INTO AssetCatalogue VALUES
	('Lenovo ThinkPad', 2, 'E14', '16GB RAM/512GB SSD/Windows 11 Home/AMD Radeon Graphics/Backlit Keyboard/FPR/Black/1.41 kg', 'fakepath/image.jpg', '14" (35.56 cm) WUXGA IPS 300 Nits Thin and Light Laptop', 'Available', '2022-05-18', NULL, 82421),
	('Acer', 1, 'HA240Y ', '23.8 Inch (60.45 Cm) 1920 x 1080 Pixels Full HD IPS Ultra Slim (6.6Mm Thick) LCD Monitor', 'fakepath/image.jpg', 'LED Back Light Technology | Frameless Design | AMD Free Sync | White', 'Available', '2021-08-25', NULL, 14600)

INSERT INTO Employees VALUES
	('Tiju Lukose', 'tijulukose0402@gmail.com', 'tijulukose0402@gmail.com', 'PasswordHash', 'PasswordSalt', 'Male', '+919175301750', 'Pune, Maharashtra, India'),
	('Roy Jackson', 'royjackson@gmail.com', 'royjackson@gmail.com', 'PasswordHash', 'PasswordSalt', 'Male', '+918564213579', 'Chennai, Tamil Nadu'),
	('Amelia Carter', 'ameliacarter@gmail.com', 'ameliacarter@gmail.com', 'PasswordHash', 'PasswordSalt', 'Female', '+918564745615', 'Jaipur, Rajasthan')

INSERT INTO Admins VALUES
	('Bhaskar Yarramsetti', 'bhaskaryarramsetti120@gmail.com', 'bhaskaryarramsetti120@gmail.com', 'PasswordHash', 'PasswordSalt', 'Male', '+917561856478', 'Visakhapatnam, Andhra Pradesh')

INSERT INTO AssetBorrowAndReturnRequests VALUES
	(3, 1, 2, 'BorrowAsset', '2022-05-19', '2022-05-19', 1, 'Need new monitor'),
	(1, 1, 1, 'ReturnAsset', NULL, NULL, 1, 'Not required anymore')

INSERT INTO AssetAllocationDetails VALUES
	(1, 1, 1, 'ACER Monitor', '2022-08-02', '2023-08-03', 'De-allocated'),
	(2, 2, 1, 'Leveno Laptops(2)', '2022-03-17', '2024-03-16', 'Allocated')

INSERT INTO AssetServiceRequests VALUES
	(1, 1, 'Repair', 'My monitor screen is damaged', 'Open'),
	(2, 2, 'Malfunction', 'Laptop is not booting up', 'Servicing')

INSERT INTO AssetAuditReportRequests VALUES
	(1, 1, 'Need my monitor to be audited', 'Rejected'),
	(2, 2, 'I need a report on my laptop performance', 'Verified')