export enum OrderStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  DELIVERED = 'delivered'
}

export enum UserRole {
  ADMIN = 'admin',
  CUSTOMER = 'customer'
}

export const getStatusColor = (status: OrderStatus | string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'bg-yellow-100 text-yellow-800';
    case OrderStatus.IN_PROGRESS:
      return 'bg-teal-100 text-teal-800';
    case OrderStatus.COMPLETED:
      return 'bg-green-100 text-green-800';
    case OrderStatus.DELIVERED:
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getStatusText = (status: OrderStatus | string) => {
  switch (status) {
    case OrderStatus.PENDING:
      return 'Beklemede';
    case OrderStatus.IN_PROGRESS:
      return 'Devam Ediyor';
    case OrderStatus.COMPLETED:
      return 'Tamamlandı';
    case OrderStatus.DELIVERED:
      return 'Teslim Edildi';
    default:
      return status;
  }
};
