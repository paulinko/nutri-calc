lc="$1"
echo "Changing components to $lc"
cd src/components || exit 1

if [ ! -d "$lc" ]; then
  echo "dir $lc does not exist in $(pwd), exiting"
  exit 255
fi
rm localized 2> /dev/null
ln -sf "$lc" localized

echo "Changing libs to $lc"
cd ../libs || exit 2
if [ ! -d "$lc" ]; then
  echo "dir $lc does not exist in $(pwd), exiting"
  exit 255
fi
rm localized 2> /dev/null
ln -sf "$lc" localized
echo "Done"