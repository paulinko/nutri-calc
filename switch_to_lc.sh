lc="$1"
echo "Changing components to $lc"
cd src/components || exit 1

if [ ! -d "$lc" ]; then
  exit 255
fi
ln -sf localized "$lc"

echo "Changing libs to Lc"
cd ../libs || exit 2
ln -sf localized "$lc"