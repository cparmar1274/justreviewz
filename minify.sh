for i in $(find src/main/webapp/ -name \*.jsp); do
	sed -i 's/20190322/20190719/g' $i
	echo $i
done;
for i in $(find src/main/webapp/ -name \*.js); do
	sed -i 's/20190322/20190719/g' $i
    #uglifyjs $i -b -o $i
    echo $i
done;
