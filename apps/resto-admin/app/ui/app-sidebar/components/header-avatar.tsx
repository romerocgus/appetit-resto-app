'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSidebar } from '@/components/ui/sidebar';

const getInitials = (username: string) => {
  const usernameArray = username.split(' ');
  const initials = usernameArray.map((elem) => elem[0]).join('');
  return initials.toUpperCase();
};

type HeaderAvatarProps = {
  username?: string | null;
  userImage?: string | null;
};

export default function HeaderAvatar({
  username,
  userImage,
}: HeaderAvatarProps) {
  const { state } = useSidebar();

  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={userImage || undefined} />
        <AvatarFallback className="bg-primary text-primary-foreground">
          {getInitials(username || 'Avatar Name')}
        </AvatarFallback>
      </Avatar>
      {state === 'expanded' && <span className="truncate">{username}</span>}
    </div>
  );
}
