export type CreateCapsuleInput = {
  message_text: string;
  title?: string;
  mood?: string;
  recipient_email: string;
  sender_email: string;
  open_date: string;
  delivery_method?: 'email' | 'link';
};
