import EmojiPicker, { type EmojiClickData } from 'emoji-picker-react';

type EmojiDialogBoxProps = {
  onEmojiSelect: (emoji: string) => void;
};

export default function EmojiDialogBox({ onEmojiSelect }: EmojiDialogBoxProps) {
  return (
    <div>
      <EmojiPicker
        onEmojiClick={(emojiData: EmojiClickData) => {
          onEmojiSelect(emojiData.emoji);
        }}
      />
    </div>
  );
}
