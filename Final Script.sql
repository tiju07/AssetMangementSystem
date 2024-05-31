USE [master]
GO
/****** Object:  Database [AssetManagementSystem]    Script Date: 26-05-2024 03:55:16 ******/
CREATE DATABASE [AssetManagementSystem]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'AssetManagementSystem', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AssetManagementSystem.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'AssetManagementSystem_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER\MSSQL\DATA\AssetManagementSystem_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [AssetManagementSystem] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [AssetManagementSystem].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [AssetManagementSystem] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET ARITHABORT OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [AssetManagementSystem] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [AssetManagementSystem] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET  ENABLE_BROKER 
GO
ALTER DATABASE [AssetManagementSystem] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [AssetManagementSystem] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [AssetManagementSystem] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET RECOVERY FULL 
GO
ALTER DATABASE [AssetManagementSystem] SET  MULTI_USER 
GO
ALTER DATABASE [AssetManagementSystem] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [AssetManagementSystem] SET DB_CHAINING OFF 
GO
ALTER DATABASE [AssetManagementSystem] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [AssetManagementSystem] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [AssetManagementSystem] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [AssetManagementSystem] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'AssetManagementSystem', N'ON'
GO
ALTER DATABASE [AssetManagementSystem] SET QUERY_STORE = ON
GO
ALTER DATABASE [AssetManagementSystem] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [AssetManagementSystem]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Admins]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Admins](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[PasswordHash] [varbinary](max) NOT NULL,
	[PasswordSalt] [varbinary](max) NOT NULL,
	[Gender] [nvarchar](max) NOT NULL,
	[ContactNumber] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](max) NULL,
	[IsVerified] [bit] NOT NULL,
 CONSTRAINT [PK_Admins] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetAllocationDetails]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetAllocationDetails](
	[AssetAllocationID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[AssetID] [int] NOT NULL,
	[AssetCount] [int] NOT NULL,
	[AllocationDetails] [nvarchar](max) NULL,
	[AssetAllocatedFrom] [datetime2](7) NOT NULL,
	[AssetAllocatedTill] [datetime2](7) NOT NULL,
	[AllocationStatus] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_AssetAllocationDetails] PRIMARY KEY CLUSTERED 
(
	[AssetAllocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetAuditReportRequests]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetAuditReportRequests](
	[RequestID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[AssetID] [int] NOT NULL,
	[RequestDetails] [nvarchar](max) NULL,
	[RequestStatus] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_AssetAuditReportRequests] PRIMARY KEY CLUSTERED 
(
	[RequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetBorrowAndReturnRequests]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetBorrowAndReturnRequests](
	[RequestID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[AdminID] [int] NOT NULL,
	[AssetID] [int] NOT NULL,
	[AssetRequestType] [nvarchar](max) NOT NULL,
	[AssetAllocationFrom] [datetime2](7) NULL,
	[AssetAllocationTill] [datetime2](7) NULL,
	[AssetCount] [int] NOT NULL,
	[RequestDetails] [nvarchar](max) NULL,
	[RequestStatus] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_AssetBorrowAndReturnRequests] PRIMARY KEY CLUSTERED 
(
	[RequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetCatalogue]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetCatalogue](
	[AssetID] [int] IDENTITY(1,1) NOT NULL,
	[AssetName] [nvarchar](max) NOT NULL,
	[AssetCategoryID] [int] NOT NULL,
	[AssetModel] [nvarchar](max) NULL,
	[AssetSpecifications] [nvarchar](max) NULL,
	[AssetImageURL] [nvarchar](max) NULL,
	[AssetDescription] [nvarchar](max) NULL,
	[AssetStatus] [nvarchar](max) NOT NULL,
	[ManufacturingDate] [datetime2](7) NULL,
	[ExpiryDate] [datetime2](7) NULL,
	[AssetValue] [decimal](18, 2) NULL,
	[AssetImageFilename] [nvarchar](max) NULL,
 CONSTRAINT [PK_AssetCatalogue] PRIMARY KEY CLUSTERED 
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetCategories]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetCategories](
	[CategoryID] [int] IDENTITY(1,1) NOT NULL,
	[CategoryName] [nvarchar](max) NOT NULL,
	[CategoryDescription] [nvarchar](max) NULL,
 CONSTRAINT [PK_AssetCategories] PRIMARY KEY CLUSTERED 
(
	[CategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AssetServiceRequests]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AssetServiceRequests](
	[RequestID] [int] IDENTITY(1,1) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[AssetID] [int] NOT NULL,
	[IssueType] [nvarchar](max) NOT NULL,
	[RequestDetails] [nvarchar](max) NULL,
	[RequestStatus] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_AssetServiceRequests] PRIMARY KEY CLUSTERED 
(
	[RequestID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 26-05-2024 03:55:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employees](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Username] [nvarchar](max) NOT NULL,
	[PasswordHash] [varbinary](max) NOT NULL,
	[PasswordSalt] [varbinary](max) NOT NULL,
	[Gender] [nvarchar](max) NOT NULL,
	[ContactNumber] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](max) NULL,
 CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240220171633_InitialSchemaCreation1', N'6.0.26')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240308092328_AddRequestStatusColumn', N'6.0.26')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240309045533_ModifyAssetModelImageProperties', N'6.0.26')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240315120607_UpdateAdminModelAddColumnIsVerified', N'6.0.26')
GO
SET IDENTITY_INSERT [dbo].[Admins] ON 
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (1, N'Kevin Smith', N'kevin.smith@example.com', N'kevin123', 0x1815FEF7895A6A27F80D7E639C9A06AE8F1E03AB5B57C52C756DADE4710DF4671232C87739AB3EF06E84AA5742A5C099FA32B13443783B77563967DC07C0CF73, 0x5D89AFABA8D7BA7F8385F3B503CDC64643A27A11271C420B6C9FB6C8FA04EFEE661E13437D6BB2186B0F735637C654D4F20CBA1096D36A4FCDCEED131F1B61A0BC4CF96A63F06DEE92DB383C933C1720911962B48C17E34083FD3A9819A1E3CAB32C8B96B99E56944CA03D141D3D30620436C18AA16F90D75CD1F7A0338A4A5A, N'Male', N'+1-234-567-8902', N'234 Main Street, New York, NY 10001', 1)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (2, N'Laura Jones', N'laura.jones@example.com', N'laura456', 0x283D60CADD0289EA7C0FC44F7D0AD3478222E7A4E708797394D7AF34F3892CC9768DEFBD7401445D0C3B0825FBBFE0EE2DC3E4E95600273A2C64308876C550C6, 0xDC6CCA6CB6EAD4E431A733A76E4B89CFBADF32D3E5A7BC07FA45B119E99F7E147789E5019FD475EADDC96F309915793EF8632B7C4AE4A63F9CFD60652337FF45B87E42CBD7CC748DDF76AAB86E0DF50CC700F0E4FE8C00C4FDBD07C53530AC4A20AC0808D4A3F792AB01344DE94A8E793090F478ABBCE823C162B60BDF8760E0, N'Female', N'+1-345-678-9013', N'567 Park Avenue, Los Angeles, CA 90001', 1)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (3, N'Mark Brown', N'mark.brown@example.com', N'mark789', 0x2B1316AE741CDBF6191F385906967FA5DD2E2D1B8EB4F84E5E134E7F083C68743C5167C28782DFF8F350ABCB1561A04C0FD34BFBF2FEE3A34AA45AB5ED6D8A35, 0x9BA3BDA7D74EF0EBA0FD6BA9689123D60271159A5E8495E4E863783013EC6E72E3CD0D8D54425835B6E85E004BFC29F80D1F06A7023BC0485DB3274238975E8586CE39F4C2EDC9DBC1954765DD4AF48473586A99A73117EFE6712D03641CA8C7E8035A910447D278F8EA226ECEA06DAED7AF0BF557DB3125C100569971B21F62, N'Male', N'+1-456-789-0124', N'890 Elm Street, Chicago, IL 60001', 1)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (4, N'Nancy Lee', N'nancy.lee@example.com', N'nancy123', 0x8F32A1D83C7B4254105D3B2C74BF6741E05B61543BECA37DD1EE8441E478C6E639F59C88342C0B8FD7143F725081D16B6BFEDEE9A3C8760B5CD616022D2CD2DE, 0x4E43DE78BCFF1667A44136732C134EAAD6C76640D984317A2E345FAC9E61044571D01DAAC5EAE4F53BB90A74B9A79BD2EF1107CDC370D89049B30FA5B28661A0DDD02D8174AFFB1135918878784348C9199D3759EFC29F0657558582C7C69DDF0DF05B2E9953508A8DFA0CD1589733043F9E4E3A792014B0A3880DCABDD020E5, N'Female', N'+1-567-890-1235', N'234 Maple Avenue, Houston, TX 70001', 1)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (5, N'Oscar Johnson', N'oscar.johnson@example.com', N'oscar456', 0xDFBD5AEB0489ED731C2570EC51B36FCDE69FF236FC06D7CBE1BE09636EB9DF9AF782C356C63B2C31F7CF5BBF38342368EBAF7537CC419D53035570FA7E94652F, 0xA48E36D3839A737F4DDF370A5152B8B3962C88EE386F1695828F9B8D32CEDE05ED6052F60099E474BE2D6AE3BF56256CC92AED779711F9B11721884886E3E0EDC20E55D1B022C56B39055E9CABC315CC82E653DCBB372C596B4A33051D511BB19D8E106DC48C80712A6479ABFA3A0F2AB251571D65A0496B9447DE2CCC486A72, N'Male', N'+1-678-901-2346', N'567 Pine Street, Phoenix, AZ 80001', 1)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (6, N'Pamela Green', N'pamela.green@example.com', N'pamela789', 0xE5007837D403637064FC0659F9476535BDF276D8120C27F1314322BEDF5EBE8C1AB58EFCCAD59460E50C4EFF7118E9B50156A8EB9FEC5646A697C9AE2A01C30D, 0xDF36ACA4D10E3E5F37A5EB74093AB0DEF8CBD09E8E282B6C38FC3A968708146AC3F64796AF33DE77F90368DF3FE46B78C21404AAA77687E6B48BEF9BF1D43922F979C6D8660708A480EEB053DAA6871AA0B693DFDD732FD4F5279F4F6DFF0EB9C0A76E1C4E2587BEBE57710FD0DBCCACD656FC20A377312C4BC5AF659B760CF9, N'Female', N'+1-789-012-3457', N'890 Oak Street, Seattle, WA 90001', 0)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (7, N'Quentin Martin', N'quentin.martin@example.com', N'quentin123', 0x8F2E1037A6D4A7483693DEC6A8E3BC5DF18646B3E80BD795360CA0A66DBC2D7B442249772113EA513274601A7A71BBA83BCFEA4243F8E266210316E4F5C9ABDB, 0xE98E7CC8EA3AEAB01BC1B09973E006F10B45AD7ADBF103162DE4F9E07A0261727A35978F821597DB01BBB69106FF871A1211BEBDEC28427F299D51FE43669B8F4411609628A7F8F80788074FAC23B9C75D8A4F814831FC9C0EC1690183C2AEB1B3DB8C4DAC87C86EC86C6B0C1D17F767928A8CE345A1301539D91F3D717CA208, N'Male', N'+1-890-123-4568', N'234 Walnut Street, Boston, MA 10002', 0)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (8, N'Rachel Clark', N'rachel.clark@example.com', N'rachel456', 0xD9270ED8DE4E4F6C1C50BDB71A14E321F2C542BA5BF8F386C87C783DCE1A8B4537233058E10860983641701722897ED1A049C2188B30FA8D13F6DB78DBE4743C, 0xEE2A8CF2DCA06E912893B86F2C5779E7E25D628F5FC83319B33958F20E459BF04B3A7B7911A21E7ACE89855D9E8AE26DA6F1B0448595BE73317292196A40F2111EBC99B960B5A193A9CA7CD9CDCF5D298CC3CA0DA887B888F22548601987E42690CF30544FFADAF05E3E479E056F4AB1A3512D2B5F064B46730D0390CBEA7A42, N'Female', N'+1-901-234-5679', N'567 Cherry Street, Miami, FL 20002', 0)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (9, N'Steven Wilson', N'steven.wilson@example.com', N'steven789', 0xCDB2A900BC21AEA823A42701F3669352429361E49E083B8D69821D1919F0CA4EAA5D77AFD395AC4A1F255D25FC980EE684070C5F8685F8726069F33DA2A3BA87, 0x158ACD50DCF71A6B3EDA1A740ADDD6BD4C483C20EB3E7625D37944769BCE7922D5E767CA760FC2E8FFA1DB3769E39EDACF5DD02E54DDE8F24927509FC4F04EA406994AF664CE2F963691169D3D0D839CCF948938D658974FE2F3B43B40F6C62C33767CBE811288FF7CD4DFD7235A824714E7C4BF52B1F05C8D16A59A80A50610, N'Male', N'+1-012-345-6790', N'890 Birch Street, Denver, CO 30002', 0)
GO
INSERT [dbo].[Admins] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address], [IsVerified]) VALUES (10, N'Tina Roberts', N'tina.roberts@example.com', N'tina123', 0x66964D6568C9A0D0A8FE9230463F093DB984F392E4954A51852C6CFEE3AB41CA1961E18F3458B3D02853F564E1ED78F379DADCA8F0AD134BF36A55BD65151B14, 0x26FD5E4F7CEC67520A6C8F3B06AA9F00C9EB155FCDD7084EA764FA5532BE86A792C243DAD1BC98794A0618418E4F63D14AF8C2AAF74E6A3BE4195921164EE7B19B1C0DBB1D99E492022703C4371E8025626EF42085C9422ECFBF7F2FEADB29D4BC9F9F1C87F48DBDABBC6601191A47029FF7E5BA83AB70CB2256F77BAB898DCF, N'Female', N'+1-123-456-7891', N'234 Cedar Street, San Francisco, CA 40002', 0)
GO
SET IDENTITY_INSERT [dbo].[Admins] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetAllocationDetails] ON 
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (1, 3, 1, 2, N'Allocated laptops for team offsite meeting', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (2, 8, 3, 1, N'Allocated car for business trip', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (3, 2, 7, 3, N'Allocated servers for software testing project', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (5, 4, 14, 2, N'Allocated networking equipment for office expansion', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (6, 5, 2, 1, N'Allocated laptops for project completion', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (7, 1, 4, 1, N'Allocated car for business trip', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (8, 6, 8, 2, N'Allocated servers for software testing project', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (9, 9, 10, 1, N'Allocated audio-visual equipment for presentation', CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (10, 7, 15, 1, N'Allocated networking equipment for office expansion', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (11, 3, 1, 2, N'Returned laptops after team offsite meeting', CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (12, 8, 3, 1, N'Returned car after business trip', CAST(N'2024-02-27T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (13, 2, 7, 3, N'Returned servers after software testing project', CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-01T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (15, 4, 14, 2, N'Returned networking equipment after office expansion', CAST(N'2024-03-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-03T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (16, 5, 2, 1, N'Returned laptops after project completion', CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (17, 1, 4, 1, N'Returned car after business trip', CAST(N'2024-02-27T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (18, 6, 8, 2, N'Returned servers after software testing project', CAST(N'2024-02-28T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-01T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (19, 9, 10, 1, N'Returned audio-visual equipment after presentation', CAST(N'2024-02-29T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-02T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (20, 7, 15, 1, N'Returned networking equipment after office expansion', CAST(N'2024-03-01T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-03T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (21, 2, 6, 1, N'Allocating desk for office work', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2025-02-07T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (22, 5, 6, 1, N'Allocating desk for office work', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-11T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (23, 7, 4, 1, N'Allocating desk for office work', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-11-22T00:00:00.0000000' AS DateTime2), N'Allocated')
GO
INSERT [dbo].[AssetAllocationDetails] ([AssetAllocationID], [EmployeeID], [AssetID], [AssetCount], [AllocationDetails], [AssetAllocatedFrom], [AssetAllocatedTill], [AllocationStatus]) VALUES (24, 8, 12, 1, NULL, CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-07T00:00:00.0000000' AS DateTime2), N'Deallocated')
GO
SET IDENTITY_INSERT [dbo].[AssetAllocationDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetAuditReportRequests] ON 
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (1, 3, 1, N'Audit the condition of the laptop.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (2, 8, 3, N'Verify the maintenance records of the car.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (3, 2, 7, N'Audit the server configurations.', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (5, 4, 14, N'Audit the networking equipment inventory.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (6, 5, 2, N'Verify the repair history of the laptop.', N'Rejected')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (7, 1, 4, N'Audit the mileage of the company car.', N'Rejected')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (8, 6, 8, N'Verify the software licenses installed on the server.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (9, 9, 10, N'Audit the usage logs of the audio-visual equipment.', N'Rejected')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (10, 7, 15, N'Verify the network security configurations.', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (11, 3, 1, N'Audit the battery health of the laptop.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (12, 8, 3, N'Verify the insurance details of the car.', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (13, 2, 7, N'Audit the server backup procedures.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (15, 4, 14, N'Audit the network performance metrics.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (16, 5, 2, N'Verify the hardware upgrades of the laptop.', N'Rejected')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (17, 1, 4, N'Audit the cleanliness of the car interior.', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (18, 6, 8, N'Verify the server uptime records.', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (19, 9, 10, N'Audit the audio-visual equipment maintenance schedule.', N'Rejected')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (20, 7, 15, N'Verify the firewall configurations of the networking equipment.', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (21, 4, 4, N'', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (22, 5, 7, N'', N'Pending')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (23, 4, 10, N'Updating Request the second time!', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (24, 5, 3, N'', N'Verified')
GO
INSERT [dbo].[AssetAuditReportRequests] ([RequestID], [EmployeeID], [AssetID], [RequestDetails], [RequestStatus]) VALUES (25, 1, 10, N'', N'Pending')
GO
SET IDENTITY_INSERT [dbo].[AssetAuditReportRequests] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetBorrowAndReturnRequests] ON 
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (1, 3, 7, 1, N'Borrow', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-03-09T00:00:00.0000000' AS DateTime2), 2, N'Need laptops for a team offsite meeting.', N'Rejected')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (2, 8, 5, 3, N'Borrow', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), 1, N'Require a car for a business trip.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (3, 2, 9, 7, N'Borrow', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), 3, N'Requesting servers for a software testing project.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (5, 4, 1, 4, N'Borrow', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), 2, N'Require networking equipment for office expansion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (6, 3, 7, 1, N'Borrow', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), 2, N'Need laptops for a team offsite meeting.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (7, 8, 5, 3, N'Borrow', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), 1, N'Require a car for a business trip.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (8, 2, 9, 7, N'Borrow', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), 3, N'Requesting servers for a software testing project.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (10, 4, 1, 4, N'Borrow', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), 2, N'Require networking equipment for office expansion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (11, 5, 3, 2, N'Return', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), 1, N'Returning borrowed laptops after project completion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (12, 1, 8, 4, N'Return', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), 1, N'Returning company car after business trip.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (13, 6, 2, 8, N'Return', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), 2, N'Returning borrowed servers.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (14, 9, 10, 10, N'Return', CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), 1, N'Returning audio-visual equipment after presentation.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (15, 7, 4, 5, N'Return', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), 1, N'Returning networking equipment after office expansion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (16, 5, 3, 2, N'Return', CAST(N'2024-02-20T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), 1, N'Returning borrowed laptops after project completion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (17, 1, 8, 4, N'Return', CAST(N'2024-02-21T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), 1, N'Returning company car after business trip.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (18, 6, 2, 8, N'Return', CAST(N'2024-02-22T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), 2, N'Returning borrowed servers.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (19, 9, 10, 10, N'Return', CAST(N'2024-02-23T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-25T00:00:00.0000000' AS DateTime2), 1, N'Returning audio-visual equipment after presentation.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (20, 7, 4, 5, N'Return', CAST(N'2024-02-24T00:00:00.0000000' AS DateTime2), CAST(N'2024-02-26T00:00:00.0000000' AS DateTime2), 1, N'Returning networking equipment after office expansion.', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (21, 1, 1, 1, N'Borrow', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2024-09-07T00:00:00.0000000' AS DateTime2), 1, N'Need laptops for team offsite meeting', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (22, 1, 1, 9, N'Borrow', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-06T00:00:00.0000000' AS DateTime2), 1, N'Need additional printer for office event', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (23, 1, 1, 7, N'Borrow', CAST(N'2024-03-07T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-07T00:00:00.0000000' AS DateTime2), 10, N'Requesting mobile phones for new hires', N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (24, 1, 1, 5, N'Borrow', CAST(N'2024-03-08T00:00:00.0000000' AS DateTime2), CAST(N'2024-05-08T00:00:00.0000000' AS DateTime2), 1, NULL, N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (25, 1, 1, 12, N'Borrow', CAST(N'2024-03-14T00:00:00.0000000' AS DateTime2), CAST(N'2025-03-14T00:00:00.0000000' AS DateTime2), 1, NULL, N'Open')
GO
INSERT [dbo].[AssetBorrowAndReturnRequests] ([RequestID], [EmployeeID], [AdminID], [AssetID], [AssetRequestType], [AssetAllocationFrom], [AssetAllocationTill], [AssetCount], [RequestDetails], [RequestStatus]) VALUES (26, 14, 1, 1, N'Borrow', CAST(N'2024-03-15T00:00:00.0000000' AS DateTime2), CAST(N'2024-04-15T00:00:00.0000000' AS DateTime2), 1, NULL, N'Servicing')
GO
SET IDENTITY_INSERT [dbo].[AssetBorrowAndReturnRequests] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetCatalogue] ON 
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (1, N'Dell Latitude 7410', 1, N'Latitude 7410', N'Intel Core i7, 16GB RAM, 512GB SSD', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216021/HexAMS/Asset%20Images/DELL-7410_zsofnb.webp', N'Powerful business laptop for productivity.', N'Available', CAST(N'2021-05-15T00:00:00.0000000' AS DateTime2), NULL, CAST(1200.00 AS Decimal(18, 2)), N'DELL-7410')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (2, N'HP Spectre x360', 1, N'Spectre x360', N'Intel Core i7, 16GB RAM, 1TB SSD', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216051/HexAMS/Asset%20Images/hp-spectre-x360_ll2jkf.jpg', N'Convertible laptop with stunning design.', N'Available', CAST(N'2020-10-20T00:00:00.0000000' AS DateTime2), NULL, CAST(1500.00 AS Decimal(18, 2)), N'hp-spectre-x360')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (3, N'Office Chair', 2, N'ErgoChair Pro', N'Adjustable lumbar support, breathable mesh fabric', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216069/HexAMS/Asset%20Images/office_chair_oj6gkg.webp', N'Ergonomic chair for comfortable seating.', N'Available', CAST(N'2019-08-01T00:00:00.0000000' AS DateTime2), NULL, CAST(200.00 AS Decimal(18, 2)), N'office chair')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (4, N'Desk', 2, N'Sit-Stand Desk', N'Adjustable height, spacious surface', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216090/HexAMS/Asset%20Images/desk_b9u0wv.jpg', N'Flexible desk for dynamic workspaces.', N'Available', CAST(N'2020-03-10T00:00:00.0000000' AS DateTime2), NULL, CAST(300.00 AS Decimal(18, 2)), N'desk')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (5, N'Toyota Camry', 3, N'Camry XLE', N'4-cylinder engine, leather seats', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216112/HexAMS/Asset%20Images/toyota_camary_uxo6lv.webp', N'Comfortable sedan for daily commutes.', N'Available', CAST(N'2022-01-05T00:00:00.0000000' AS DateTime2), NULL, CAST(25000.00 AS Decimal(18, 2)), N'toyota camary')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (6, N'Honda Civic', 3, N'Civic LX', N'Fuel-efficient engine, touchscreen display', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216131/HexAMS/Asset%20Images/honda_civic_z2tjof.jpg', N'Reliable compact car with modern features.', N'Available', CAST(N'2020-11-12T00:00:00.0000000' AS DateTime2), NULL, CAST(20000.00 AS Decimal(18, 2)), N'honda civic')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (7, N'Apple iPhone 13', 4, N'iPhone 13 Pro Max', N'6.7-inch Super Retina XDR display, A15 Bionic chip', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216150/HexAMS/Asset%20Images/iphone_13_mqeanh.webp', N'Flagship smartphone with advanced camera features.', N'Available', CAST(N'2021-09-20T00:00:00.0000000' AS DateTime2), NULL, CAST(1100.00 AS Decimal(18, 2)), N'iphone 13')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (8, N'Samsung Galaxy Watch 4', 4, N'Galaxy Watch 4', N'AMOLED display, fitness tracking features', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216172/HexAMS/Asset%20Images/samsung_galaxy_watch_3_oh8gmt.jpg', N'Smartwatch for fitness and productivity.', N'Unavailable', CAST(N'2021-07-30T00:00:00.0000000' AS DateTime2), NULL, CAST(300.00 AS Decimal(18, 2)), N'samsung galaxy watch 3')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (9, N'HP LaserJet Pro', 5, N'LaserJet Pro MFP M130fw', N'Print, copy, scan, fax capabilities', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216303/HexAMS/Asset%20Images/hp_laserjet_pro_y6ec7n.png', N'All-in-one printer for small offices.', N'Available', CAST(N'2020-12-15T00:00:00.0000000' AS DateTime2), NULL, CAST(250.00 AS Decimal(18, 2)), N'hp laserjet pro')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (10, N'Epson EcoTank', 5, N'EcoTank ET-4760', N'Wireless printing, cartridge-free printing', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216322/HexAMS/Asset%20Images/Epson_EcoTank_oszoam.jpg', N'High-capacity printer with low-cost ink refills.', N'Available', CAST(N'2021-03-22T00:00:00.0000000' AS DateTime2), NULL, CAST(350.00 AS Decimal(18, 2)), N'Epson EcoTank')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (11, N'Google Pixel 6', 6, N'Pixel 6', N'6.4-inch OLED display, Snapdragon 888 chipset', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216340/HexAMS/Asset%20Images/google_pixel_6_lqmov2.webp', N'Pure Android experience with powerful performance.', N'Available', CAST(N'2021-10-10T00:00:00.0000000' AS DateTime2), NULL, CAST(800.00 AS Decimal(18, 2)), N'google pixel 6')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (12, N'OnePlus 9 Pro', 6, N'OnePlus 9 Pro', N'6.7-inch Fluid AMOLED display, Snapdragon 888 chipset', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216364/HexAMS/Asset%20Images/Oneplue_9_pro_izsg52.jpg', N'Flagship phone with Hasselblad camera.', N'Available', CAST(N'2021-04-28T00:00:00.0000000' AS DateTime2), NULL, CAST(900.00 AS Decimal(18, 2)), N'Oneplue 9 pro')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (13, N'Dell PowerEdge R740', 7, N'PowerEdge R740', N'Dual Intel Xeon Scalable processors, up to 3TB RAM', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216381/HexAMS/Asset%20Images/dell_poweredge_r740_ga8ibb.jpg', N'Enterprise server for virtualization and data management.', N'Available', CAST(N'2020-07-01T00:00:00.0000000' AS DateTime2), NULL, CAST(5000.00 AS Decimal(18, 2)), N'dell poweredge r740')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (14, N'HPE ProLiant DL380', 7, N'ProLiant DL380 Gen10', N'Dual Intel Xeon Scalable processors, up to 3.5TB RAM', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216396/HexAMS/Asset%20Images/HPE_proliant_dl380_apc4zq.webp', N'High-performance server for various workloads.', N'Available', CAST(N'2019-12-05T00:00:00.0000000' AS DateTime2), NULL, CAST(5500.00 AS Decimal(18, 2)), N'HPE proliant dl380')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (15, N'Microsoft Office 365', 8, N'Office 365 Business Premium', N'Word, Excel, PowerPoint, Outlook, Teams', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216411/HexAMS/Asset%20Images/office_365_kihlhy.jpg', N'Subscription-based productivity suite.', N'Available', CAST(N'2021-01-01T00:00:00.0000000' AS DateTime2), NULL, CAST(200.00 AS Decimal(18, 2)), N'office 365')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (16, N'Adobe Creative Cloud', 8, N'Creative Cloud All Apps', N'Photoshop, Illustrator, Premiere Pro, After Effects', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216423/HexAMS/Asset%20Images/adobe_creative_cloud_kgqicd.jpg', N'Suite of creative software for design and multimedia.', N'Unavailable', CAST(N'2020-06-15T00:00:00.0000000' AS DateTime2), NULL, CAST(300.00 AS Decimal(18, 2)), N'adobe creative cloud')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (17, N'Cisco Catalyst 9200', 9, N'Catalyst 9200-24T', N'24-port managed switch, Gigabit Ethernet', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216439/HexAMS/Asset%20Images/cisco_catalyst_900_fsvckj.png', N'Enterprise-grade switch for network connectivity.', N'Unavailable', CAST(N'2020-11-20T00:00:00.0000000' AS DateTime2), NULL, CAST(1500.00 AS Decimal(18, 2)), N'cisco catalyst 900')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (18, N'Ubiquiti UniFi Dream Machine', 9, N'UniFi Dream Machine', N'Router, switch, security gateway, and access point', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216456/HexAMS/Asset%20Images/Ubiquiti_UniFi_Dream_Machine_t33qf0.jpg', N'All-in-one network solution for home or small business.', N'Unavailable', CAST(N'2021-02-28T00:00:00.0000000' AS DateTime2), NULL, CAST(300.00 AS Decimal(18, 2)), N'Ubiquiti UniFi Dream Machine')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (19, N'BenQ TK850', 10, N'TK850 4K HDR Projector', N'4K UHD resolution, HDR-PRO technology', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216470/HexAMS/Asset%20Images/BenQ_TK850_klgmic.jpg', N'High-quality projector for immersive viewing experiences.', N'Unavailable', CAST(N'2020-09-10T00:00:00.0000000' AS DateTime2), NULL, CAST(1500.00 AS Decimal(18, 2)), N'BenQ TK850')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (20, N'Logitech Rally', 10, N'Rally Plus', N'4K camera, dual speakers, microphone pods', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216485/HexAMS/Asset%20Images/Logitech_Rally_serdmj.webp', N'Premium video conferencing system for large rooms.', N'Unavailable', CAST(N'2019-11-25T00:00:00.0000000' AS DateTime2), NULL, CAST(5000.00 AS Decimal(18, 2)), N'Logitech Rally')
GO
INSERT [dbo].[AssetCatalogue] ([AssetID], [AssetName], [AssetCategoryID], [AssetModel], [AssetSpecifications], [AssetImageURL], [AssetDescription], [AssetStatus], [ManufacturingDate], [ExpiryDate], [AssetValue], [AssetImageFilename]) VALUES (21, N'Apple MacBook Air', 1, N'', N'', N'http://res.cloudinary.com/domp5l8sc/image/upload/v1710216511/HexAMS/Asset%20Images/Apple_MacBook_Pro_udsbzx.jpg', N'', N'Available', NULL, NULL, CAST(82990.00 AS Decimal(18, 2)), N'Apple MacBook Pro')
GO
SET IDENTITY_INSERT [dbo].[AssetCatalogue] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetCategories] ON 
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (1, N'Laptop', N'Please ensure to handle laptops with care and follow company policies for data security.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (2, N'Furniture', N'Please report any damages or issues with furniture to the facilities department for timely repairs.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (3, N'Car', N'All company cars must be used responsibly and in compliance with traffic laws.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (4, N'Gadgets', N'Ensure proper handling and maintenance of gadgets to prolong their lifespan.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (5, N'Printer', N'Please be mindful of the printers ink levels and report any issues to the IT department.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (6, N'Mobile Phone', N'Protect your mobile phone from physical damage and be cautious while handling sensitive company information.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (7, N'Server', N'Servers are critical assets, ensure to follow proper shutdown procedures and report any performance issues immediately.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (8, N'Software', N'Software licenses must be used in accordance with company policies to avoid legal implications.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (9, N'Networking Equipment', N'Properly configure and maintain networking equipment to ensure smooth communication within the organization.')
GO
INSERT [dbo].[AssetCategories] ([CategoryID], [CategoryName], [CategoryDescription]) VALUES (10, N'Audio-Visual Equipment', N'Handle audio-visual equipment with care and return them to designated storage areas after use.')
GO
SET IDENTITY_INSERT [dbo].[AssetCategories] OFF
GO
SET IDENTITY_INSERT [dbo].[AssetServiceRequests] ON 
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (1, 3, 1, N'Malfunction', N'Laptop is not booting up properly.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (2, 8, 3, N'Repair', N'Car has a flat tire.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (3, 2, 7, N'Malfunction', N'Server is experiencing high CPU usage.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (5, 4, 14, N'Malfunction', N'Networking equipment is not connecting to the network.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (6, 5, 2, N'Repair', N'Laptop screen is cracked.', N'Closed')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (7, 1, 4, N'Malfunction', N'Car engine is making strange noises.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (8, 6, 8, N'Repair', N'Server is showing disk failure warnings.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (9, 9, 10, N'Malfunction', N'Audio-visual equipment is not powering on.', N'Rejected')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (10, 7, 15, N'Repair', N'Networking equipment needs firmware update.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (11, 3, 1, N'Malfunction', N'Laptop keyboard keys not functioning properly.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (12, 8, 3, N'Repair', N'Car needs oil change and routine maintenance.', N'Closed')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (13, 2, 7, N'Malfunction', N'Server is not responding to network requests.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (15, 4, 14, N'Malfunction', N'Networking equipment showing intermittent connectivity.', N'Closed')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (16, 5, 2, N'Repair', N'Laptop battery not holding charge.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (17, 1, 4, N'Malfunction', N'Car brakes are squeaking.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (18, 6, 8, N'Repair', N'Server needs RAM upgrade.', N'Closed')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (19, 9, 10, N'Malfunction', N'Audio-visual equipment audio output is distorted.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (20, 7, 15, N'Repair', N'Networking equipment needs port replacement.', N'Servicing')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (21, 1, 4, N'Repair', N'Desk broken, need it repaired or replaced immediately.', N'Open')
GO
INSERT [dbo].[AssetServiceRequests] ([RequestID], [EmployeeID], [AssetID], [IssueType], [RequestDetails], [RequestStatus]) VALUES (22, 1, 4, N'Repair', N'Desk height adjustment not working.', N'Open')
GO
SET IDENTITY_INSERT [dbo].[AssetServiceRequests] OFF
GO
SET IDENTITY_INSERT [dbo].[Employees] ON 
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (1, N'Alice Smith', N'alice.smith@example.com', N'alice123', 0x340AFE70922F863E17CD1917B8900834A682BCDAF8EB5F24FF782D95C6A986B8B0FF829AF4664998CCDA91FD92564E7907B9674B5DFAFA6F69585DEF0DE56E3B, 0xE59D7391E126F273366B9718575ED569064A1184FBE0401D954D91D5DBCF6F7ADEB0D1E88D2AD82C802F898EEEF2457BE5DD1A21ADBD920E36575F397ED61FD577343DBE67D9ABE310115E8FAFDFBAAF1673315C9FC2B01B54BD130D66F1ACEA386C227F5533D3F362876DB3FBFC98050C15D57B8880F5646E4895343AAE7243, N'Female', N'+1-234-567-8901', N'123 Main Street, New York, NY 10001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (2, N'Bob Jones', N'bob.jones@example.com', N'bob456', 0x98AEE6FC7C726561830869035C2A8E1B1A1DA59279A57E14D7714A45852C86794BA234C58E143B886255657A338BDA3E0F36C0CEB68B9552C5B55652ED4BA13E, 0x2C9DE5C2EEC2C2BB00B68AC54E84A9879DE147AF2B917B33DE5B505A3C874DD0866A0E5BDFDD5754687B56A3D83B4E1AF0E555E092FB726C7F6CD67F4B65E8B74398AA989915EB5DB9FEA894740CB2D57BD859299215C55F2A622820D46E3020C7E4CBBA189306D3A94FA3F1649330EDA244AA138FCF46599860128268829270, N'Male', N'+1-345-678-9012', N'456 Park Avenue, Los Angeles, CA 90001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (3, N'Charlie Brown', N'charlie.brown@example.com', N'charlie789', 0x18416BCE2114E49652CA58D9A29EEA2ECD35E9B2F47D559B4CA1C0275D5D12DC92AFD85696400CF7D4743E1AF4A9085733F6A82911BA730F87C6A3B3566B6174, 0x4FCEC80AD026A74CFA75C5828D6617D015A024B3BF7760670A9E93EEEF4A398F3F657CEA38EC20582A798304A33EAD0942758E2AF03C10D575FBF170A05FE3D71A835D27E56EECF44DD79A788E734C4AE6555D66E485BF75E696D622759E53EE6CE43C38E89972CDDE87B049BD64E8B0C9B2F7B03AD55BF4C97254BD9133D3B6, N'Male', N'+1-456-789-0123', N'789 Elm Street, Chicago, IL 60001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (4, N'Diana Lee', N'diana.lee@example.com', N'diana123', 0x2F216BFF95225D596B4D2A51F68BD923204D5C5436FFE5BB927D00FDE102712127EDEAB38AF01EEB9DAC669A6E9C9F3E4CE3213C98D34D75AEDEDC6F7F8C7645, 0x6171C8A513CED96E4287ED53756CD01B14699DF9060D9E9A86BA85B4E6F5867BE7F2C57BC50550D64E7E085E33166F5EB805ECB362BD889133641CB2330FF374CA279CEDA691835D0ACA11B9BF71BBCE7A7A70886FB2FC1475E1B6C40D512C2C2BA8DDD5429476EA9B6E60080A3736F20BC2EFC4B1DEC3EBD1DA730DFACF65C4, N'Female', N'+1-567-890-1234', N'123 Maple Avenue, Houston, TX 70001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (5, N'Eric Johnson Friedrick', N'eric.johnson@example.com', N'eric456', 0x04460243D57B09F27A13A9C1423342841EC4274DF3E279B3A5268882586C1F6F2C32CE983A363A728F1B33FDA2BFB5C794144848BF486E8FA7BE86F7EF0052A7, 0x9F36188B328E8CE7F035E9EB9A88324247332B47188DB6F042A3B951EA20FD83264FD9398A3F2A6692F5E79D8B80E2BEEC1E51ACB3C3CD3DCD10A840325A95E5A69C4C4B1B04D9D9F211C85D19F2E36F2DBDA52DA58939D7542D2B206E58E8939AF0582AA6BCADA8CD717C1B1AA8C4E2C1913031A14041E3C8FA071612CDC77C, N'Male', N'+1-678-901-2345', N'456 Pine Street, Phoenix, AZ 80001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (6, N'Fiona Green', N'fiona.green@example.com', N'fiona789', 0xB24CAE4B1F9A869FF93EC99EF2DBFB5DDE18EF739755890B72659616949FC717D6C44807A1350D83F2D599F0EA71DFC5E05AFD9CB2234AFC2DDFD80C34438FC4, 0xC90E1213982906163A0FCC8E19F862B21D1835C90471F9FB12B52DC7DC19B8655C488271CF2824D2D66B804011114082513706529486DE2A1D62B83740348A04373AB8B637EB8796DEC69BBE42A5E17FB6F4EEB9C4D71F2AAEC2D2268729E172AE5A061DD81668E1B2E561E03F8DC53EE81DF1FFF21E454CB2F8AEFD6DE9B813, N'Female', N'+1-789-012-3456', N'789 Oak Street, Seattle, WA 90001')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (7, N'George Martin', N'george.martin@example.com', N'george123', 0xB02739321C3366030F108D201FCE9EECCD81666059E7B9B58E9300F0B6A9C233CBD6B47B2ECE33D1D076E657E6E86F257B572DE8F9E1C7528D665DB30A3FAC92, 0x3F0DD2DFE4A3B36B029984F79CA6D99DA1D86DEB5A25C08C46618A4CD2297D3F9D684D7585B90640D48D155056058F09CE2FF340ED5EA36B8BB177A5955A2F2AE5EBD595FFC9844AC359BDB3C1ABAC3E2543C9E4171ED5E1773DF12A5040F5B46B455C4A874A3D5CD0D6CD952213D0449123DB6D046C6110E71A43B2509CB9B1, N'Male', N'+1-890-123-4567', N'123 Walnut Street, Boston, MA 10002')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (8, N'Helen Clark', N'helen.clark@example.com', N'helen456', 0x217072F02D31000729BF83E2AD735418811E66A617A0469264CC3A795FFB302BFE70C5A1B154490740120AAB7A36C3B313E3955EF63AA71CEE6D84945EA756A3, 0xA157DFB7EF70D211A718E042D7196380311A8061914CDD1E91408633D1C1E0992DBA1494B8C6D301C2A4E209FA5D87D247608A609A151F628BC8634F930AC69D6BAD564E983D3FC30095E38F4B51E19E65311BFEB2DC2224D697EFE2B189A068953163BDC6B32F687E4F9057B43C1EACCE446CE2B11CC363A2D607FC890ACC59, N'Female', N'+1-901-234-5678', N'456 Cherry Street, Miami, FL 20002')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (9, N'Ian Wilson', N'ian.wilson@example.com', N'ian789', 0x914B01FAD87C1AA40C8C62BE6F449FAF000033C8B6C73866F788865545EB4A65923B16C56E9412811B0BD5B54D022B06A36EECD11DC218362AB066A086395401, 0x61002EDE58C773D9E748CDE0B46FCF6B238FD96B66CC9E59B70B8766D540735F90264D8BA64724DB7152D09B91EDB0C28AB3F943031D33E705366CBC198EF5688C418D52050BADB8790EA91FF3C5235E0EA8C63083AD957CED473886596A1FC67832E21EC55426237B0D5A88ABBBC4F2A8F2013C114A83EC2728F5A48582FF2C, N'Male', N'+1-012-345-6789', N'789 Birch Street, Denver, CO 30002')
GO
INSERT [dbo].[Employees] ([ID], [Name], [Email], [Username], [PasswordHash], [PasswordSalt], [Gender], [ContactNumber], [Address]) VALUES (14, N'Tiju Lukose', N'tijulukose0402@gmail.com', N'tijulukose0402@gmail.com', 0x11F2482ECD99BA7D7BB4E3F8F994740501FD8246F84C525760F1F575B4C7F4006E43376C0504C44139171C656B76A9827BE93CDF6B6FCA75CF96053C38D3B0DE, 0x5E1BE844083E9B5BC54D99C396A72FB0DD8D47A1663BB62AA0BB50974DB1BB9A77AFBDCE429AFB2BDBCE293F5DCE80DB4055A02DA998D224FE15A1EE767E4FDB4CF94CEC8E641CB5F332FDE449A282A87B41A5AAE90D7218E8270CAF1177B4B84DDF34CEA9DDDAA5A5AB5D356325DE0DB9AC669406A5BE71EEE21006FB7F6CF3, N'Male', N'9175301750', N'A/p Sakharale, Islampur')
GO
SET IDENTITY_INSERT [dbo].[Employees] OFF
GO
/****** Object:  Index [IX_AssetAllocationDetails_AssetID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetAllocationDetails_AssetID] ON [dbo].[AssetAllocationDetails]
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetAllocationDetails_EmployeeID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetAllocationDetails_EmployeeID] ON [dbo].[AssetAllocationDetails]
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetAuditReportRequests_AssetID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetAuditReportRequests_AssetID] ON [dbo].[AssetAuditReportRequests]
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetAuditReportRequests_EmployeeID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetAuditReportRequests_EmployeeID] ON [dbo].[AssetAuditReportRequests]
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetBorrowAndReturnRequests_AdminID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetBorrowAndReturnRequests_AdminID] ON [dbo].[AssetBorrowAndReturnRequests]
(
	[AdminID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetBorrowAndReturnRequests_AssetID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetBorrowAndReturnRequests_AssetID] ON [dbo].[AssetBorrowAndReturnRequests]
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetBorrowAndReturnRequests_EmployeeID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetBorrowAndReturnRequests_EmployeeID] ON [dbo].[AssetBorrowAndReturnRequests]
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetCatalogue_AssetCategoryID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetCatalogue_AssetCategoryID] ON [dbo].[AssetCatalogue]
(
	[AssetCategoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetServiceRequests_AssetID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetServiceRequests_AssetID] ON [dbo].[AssetServiceRequests]
(
	[AssetID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_AssetServiceRequests_EmployeeID]    Script Date: 26-05-2024 03:55:17 ******/
CREATE NONCLUSTERED INDEX [IX_AssetServiceRequests_EmployeeID] ON [dbo].[AssetServiceRequests]
(
	[EmployeeID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Admins] ADD  DEFAULT (CONVERT([bit],(0))) FOR [IsVerified]
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests] ADD  DEFAULT (N'Open') FOR [RequestStatus]
GO
ALTER TABLE [dbo].[AssetAllocationDetails]  WITH CHECK ADD  CONSTRAINT [FK_AssetAllocationDetails_AssetCatalogue_AssetID] FOREIGN KEY([AssetID])
REFERENCES [dbo].[AssetCatalogue] ([AssetID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetAllocationDetails] CHECK CONSTRAINT [FK_AssetAllocationDetails_AssetCatalogue_AssetID]
GO
ALTER TABLE [dbo].[AssetAllocationDetails]  WITH CHECK ADD  CONSTRAINT [FK_AssetAllocationDetails_Employees_EmployeeID] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetAllocationDetails] CHECK CONSTRAINT [FK_AssetAllocationDetails_Employees_EmployeeID]
GO
ALTER TABLE [dbo].[AssetAuditReportRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetAuditReportRequests_AssetCatalogue_AssetID] FOREIGN KEY([AssetID])
REFERENCES [dbo].[AssetCatalogue] ([AssetID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetAuditReportRequests] CHECK CONSTRAINT [FK_AssetAuditReportRequests_AssetCatalogue_AssetID]
GO
ALTER TABLE [dbo].[AssetAuditReportRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetAuditReportRequests_Employees_EmployeeID] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetAuditReportRequests] CHECK CONSTRAINT [FK_AssetAuditReportRequests_Employees_EmployeeID]
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetBorrowAndReturnRequests_Admins_AdminID] FOREIGN KEY([AdminID])
REFERENCES [dbo].[Admins] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests] CHECK CONSTRAINT [FK_AssetBorrowAndReturnRequests_Admins_AdminID]
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetBorrowAndReturnRequests_AssetCatalogue_AssetID] FOREIGN KEY([AssetID])
REFERENCES [dbo].[AssetCatalogue] ([AssetID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests] CHECK CONSTRAINT [FK_AssetBorrowAndReturnRequests_AssetCatalogue_AssetID]
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetBorrowAndReturnRequests_Employees_EmployeeID] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetBorrowAndReturnRequests] CHECK CONSTRAINT [FK_AssetBorrowAndReturnRequests_Employees_EmployeeID]
GO
ALTER TABLE [dbo].[AssetCatalogue]  WITH CHECK ADD  CONSTRAINT [FK_AssetCatalogue_AssetCategories_AssetCategoryID] FOREIGN KEY([AssetCategoryID])
REFERENCES [dbo].[AssetCategories] ([CategoryID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetCatalogue] CHECK CONSTRAINT [FK_AssetCatalogue_AssetCategories_AssetCategoryID]
GO
ALTER TABLE [dbo].[AssetServiceRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetServiceRequests_AssetCatalogue_AssetID] FOREIGN KEY([AssetID])
REFERENCES [dbo].[AssetCatalogue] ([AssetID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetServiceRequests] CHECK CONSTRAINT [FK_AssetServiceRequests_AssetCatalogue_AssetID]
GO
ALTER TABLE [dbo].[AssetServiceRequests]  WITH CHECK ADD  CONSTRAINT [FK_AssetServiceRequests_Employees_EmployeeID] FOREIGN KEY([EmployeeID])
REFERENCES [dbo].[Employees] ([ID])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AssetServiceRequests] CHECK CONSTRAINT [FK_AssetServiceRequests_Employees_EmployeeID]
GO
USE [master]
GO
ALTER DATABASE [AssetManagementSystem] SET  READ_WRITE 
GO
