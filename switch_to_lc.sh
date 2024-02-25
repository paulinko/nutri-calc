lc="$1"
echo "Changing components to $lc"

if [ ! -d "src/components/$lc" ]; then
  echo "dir $lc does not exist in $(pwd), exiting"
  exit 255
fi
rm -rf "$(pwd)/src/components/localized"
ln -sf "$(pwd)/src/components/$lc" src/components/localized

echo "Changing libs to $lc"
if [ ! -d "src/libs/$lc" ]; then
  echo "dir $lc does not exist in $(pwd), exiting"
  exit 255
fi
rm -rf "$(pwd)/src/libs/localized"
ln -sf "$(pwd)/src/libs/$lc" src/libs/localized
echo "Done"