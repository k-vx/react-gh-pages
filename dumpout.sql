-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: flaskblog_db
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alembic_version`
--

DROP TABLE IF EXISTS `alembic_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alembic_version` (
  `version_num` varchar(32) NOT NULL,
  PRIMARY KEY (`version_num`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alembic_version`
--

LOCK TABLES `alembic_version` WRITE;
/*!40000 ALTER TABLE `alembic_version` DISABLE KEYS */;
INSERT INTO `alembic_version` VALUES ('28ccb9c2b3a2');
/*!40000 ALTER TABLE `alembic_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_id` int(11) DEFAULT NULL,
  `title` varchar(120) NOT NULL,
  `date_posted` datetime NOT NULL,
  `content` mediumtext NOT NULL,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `category_id` (`category_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `post_category` (`id`),
  CONSTRAINT `post_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,1,'cpp学习笔记0-输入输出基础','2019-07-10 15:05:26','## 读文件内容作为标准输入(freopen)\r\n\r\n调试程序时手动输入太麻烦，若有测试数据的文件，可以直接用freopen(读作 f re open)。\r\n\r\n如文件/test.txt内容：\r\n\r\n```c++\r\n1 22 4 7 9 7\r\n```\r\n\r\n下面一段代码的运行结果：\r\n\r\n```c++\r\n22\r\n```\r\n\r\nCode:\r\n\r\n```c++\r\n#include<iostream>\r\nusing namespace std;\r\nint main(){\r\n    freopen(\"/test.txt\", \"r\", stdin);\r\n    int n, max = 0;\r\n    while( cin >> n){\r\n        if(n > max)\r\n            max = n;\r\n    }\r\n    printf(\"%d\", max);\r\n}\r\n```\r\n\r\n## scanf, printf, cin, cout\r\n\r\n- cin、cout速度比scanf、pirntf慢，输入输出大量数据时使用后者\r\n- scanf各项用空格分隔，如果的是字符，输入的空格会被当成字符读入。cin不会\r\n- scanf的返回结果是成功读入的元素个数，cin则返回true和false表示成功或失败\r\n- 一个程序中不要同时使用cin和scanf，cout和printf\r\n\r\n### 用scanf读入不同类型的变量\r\n\r\n用scanf输入的各项之间用空格分割，但注意若是读入一个字符，输入空格的话会被当成输入的字符\r\n\r\n```c++\r\n#include<iostream>\r\nusing namespace std;\r\nint main(){\r\n    int n; char c; float f;\r\n    scanf(\"%d%c%f\", &n, &c, &f);\r\n    printf(\"%d %c %f\", n, c, f);\r\n}\r\n```\r\n\r\n输入：\r\n\r\n```c++\r\n34k 234.45\r\n```\r\n\r\n输出：\r\n\r\n```c++\r\n34 k 234.449997\r\n```\r\n\r\n若输入：\r\n\r\n```c++\r\n34 k 456\r\n```\r\n\r\n则会输出：\r\n\r\n```c++\r\n34  0.000000    //第一个空格给了c，k给了f导致f无效\r\n```\r\n\r\n### c++的cin读入\r\n\r\n不同于scanf，在读入一个字符时，cin会跳过空格。\r\n\r\n下面两种方法，注意scanf用char，cin用int\r\n\r\n- 用scanf读入所有输入的字符，包括空格、回车\r\n\r\n```c++\r\n#include<iostream>\r\n#include<cstdio>\r\nusing namespace std;\r\nint main(){\r\n    char c;\r\n    while(scanf(\"%c\", &C) != EOF)\r\n        printf(\"%c\", c);\r\n    return 0;\r\n}\r\n```\r\n\r\n- 用cin读入所有输入的字符，包括空格、回车\r\n\r\n```c++\r\n#include<iostream>\r\nusing namespace std;\r\nint main(){\r\n    int c;\r\n    //cin.get()返回int类型，即输入字符的ascii码\r\n    while((c = cin.get()) != EOF){\r\n        cout << (char)c;\r\n    }\r\n}\r\n```\r\n\r\n### scanf表达式的值\r\n\r\n返回值为int，表示成功读入的变量的个数\r\n\r\n```c++\r\nint n, m;\r\nprintf(\"%d\", scanf(\"%d%d\", &n, &m));\r\n```\r\n\r\n例：\r\n\r\n```\r\n12 56\r\n2\r\n\r\n40 a\r\n1        //a没有成功读入，所以只有一个\r\n\r\na 50\r\n0        //第一个就没有成功读入，后面也停止，所以一个\r\n```\r\n\r\nscanf也可以返回EOF，windows下按Ctrl+z然后回车，程序结束。linux下则是ctrl+D表示EOF。\r\n\r\n敲Ctrl+z，在windos下scanf返回EOF\r\n\r\n```c++\r\n//不断输入两个整数，再输出它们的和\r\nint n, m;\r\nwhile(scanf(\"%d%d\", &n, &m) != EOF)\r\n    printf(\"%d\", n + m);\r\n\r\n//另外一种实现方式\r\nint n, m;\r\nwhile(scanf(\"%d%d\", &n, &m) == 2)\r\n    printf(\"%d\", n + m);\r\n```\r\n\r\n### cin表达式的值\r\n\r\ncin >> m >> n....    在成功读入所有变量时返回true，否则返回false\r\n\r\nCtrl+z然后回车，读不到东西，cin返回false，跳出循环\r\n\r\n```c++\r\nint n, m;\r\nwhile(cin >> n >> m)\r\n    printf(\"%d\", n+m);\r\n```\r\n\r\n## 处理无结束标记的OJ题目\r\n\r\n输入若干个（不知道多少个）正整数，输出其中的最大值\r\n\r\nSample Input:\r\n\r\n```c++\r\n2 3 4 5 6 787 54532 12\r\n```\r\n\r\nSample Output:\r\n\r\n```c++\r\n54532\r\n```\r\n\r\nCode:\r\n\r\n```c++\r\n#include<iostream>\r\nusing namespace std;\r\nint main(){\r\n    int n mx = 0;\r\n    //用cin则是: while(cin >> n)\r\n    while(scanf(\"%d\", &n) != EOF){\r\n        if(n > mx)\r\n            mx = n;\r\n    }\r\n    printf(\"%d\", mx);\r\n    return 0;\r\n}\r\n```',1,1);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_category`
--

DROP TABLE IF EXISTS `post_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_category`
--

LOCK TABLES `post_category` WRITE;
/*!40000 ALTER TABLE `post_category` DISABLE KEYS */;
INSERT INTO `post_category` VALUES (1,'cpp','cpp相关的笔记。cpp学习笔记系列是根据mooc郭炜《程序设计与算法》系列课程的笔记');
/*!40000 ALTER TABLE `post_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution`
--

DROP TABLE IF EXISTS `solution`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solution` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sub_id` int(11) DEFAULT NULL,
  `title` varchar(120) NOT NULL,
  `date_posted` datetime NOT NULL,
  `description` mediumtext NOT NULL,
  `solution` mediumtext NOT NULL,
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `solution_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `solution_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution`
--

LOCK TABLES `solution` WRITE;
/*!40000 ALTER TABLE `solution` DISABLE KEYS */;
INSERT INTO `solution` VALUES (1,1,'Two Sum','2019-07-10 08:51:43',' ','### 思路1 利用hash的思想\r\n\r\n由于最后要返回的是索引的数组。用hash的key来存放数组中一个元素的值，而用hash的value来存放那个值得索引。这样就建立了数组元素值对数组元素索引的映射。\r\n\r\n```cpp\r\nclass Solution {\r\npublic:\r\n    vector<int> twoSum(vector<int>& nums, int target) {\r\n        // key is value in nums, value of hash is its indx\r\n        unordered_map<int, int> hash;\r\n        vector<int> result;\r\n        for(int i = 0; i < nums.size(); i++){\r\n            int num_to_find = target - nums[i];\r\n\r\n            if(hash.find(num_to_find) != hash.end()){\r\n                result.push_back(hash[num_to_find]);\r\n                result.push_back(i);\r\n                break;   // exactly one solution\r\n            }else{\r\n                hash[nums[i]] = i;\r\n            }\r\n        }\r\n        return result;\r\n    }\r\n};\r\n```\r\n\r\n```py\r\nclass Solution:\r\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\r\n        # key: nums\' element, value: index of that element\r\n        mapping = {}\r\n        for i in range(len(nums)):\r\n            num_to_find = target - nums[i]\r\n            if num_to_find in mapping.keys():\r\n                return [i, mapping[num_to_find]]\r\n            else:\r\n                mapping[nums[i]] = i\r\n```',1),(2,2,'Add Two Numbers','2019-07-11 06:15:05',' ','### 思路1 直接从左往右加\r\n\r\n因为输入的链表和我们正常计数的方向是反着的，我们直接从左往右加，正好就是从个位开始算。另外用carry来处理进位。\r\n\r\n```cpp\r\n/**\r\n * Definition for singly-linked list.\r\n * struct ListNode {\r\n *     int val;\r\n *     ListNode *next;\r\n *     ListNode(int x) : val(x), next(NULL) {}\r\n * };\r\n */\r\nclass Solution {\r\npublic:\r\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\r\n        ListNode pre_head(0), *p = &pre_head;\r\n        int carry = 0;\r\n        while(l1 || l2 || carry){\r\n            int sum = (l1 ? l1->val : 0) + (l2 ? l2->val : 0) + carry;\r\n            carry = sum / 10;\r\n            p->next = new ListNode(sum % 10);\r\n            p = p->next;\r\n            l1 = l1 ? l1->next : l1;\r\n            l2 = l2 ? l2->next : l2;\r\n        }\r\n        return pre_head.next; // pre_head is not pointer, so just use dot\r\n    }\r\n};\r\n```\r\n\r\n```py\r\n# Definition for singly-linked list.\r\n# class ListNode:\r\n#     def __init__(self, x):\r\n#         self.val = x\r\n#         self.next = None\r\n\r\nclass Solution:\r\n    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:\r\n        pre_head = p = ListNode(0)\r\n        carry = 0\r\n        while l1 or l2 or carry:\r\n            v1, v2 = 0, 0\r\n            if l1:\r\n                v1 = l1.val\r\n                l1 = l1.next\r\n            if l2:\r\n                v2 = l2.val\r\n                l2 = l2.next\r\n            carry, current = divmod(v1 + v2 + carry, 10)\r\n            p.next = ListNode(current)\r\n            p = p.next\r\n        return pre_head.next\r\n```',1);
/*!40000 ALTER TABLE `solution` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solution_category`
--

DROP TABLE IF EXISTS `solution_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `solution_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) NOT NULL,
  `description` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solution_category`
--

LOCK TABLES `solution_category` WRITE;
/*!40000 ALTER TABLE `solution_category` DISABLE KEYS */;
INSERT INTO `solution_category` VALUES (1,'leetcode','leetcode题解题，主要语言是cpp和python，陆续补充中...');
/*!40000 ALTER TABLE `solution_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `is_admin` tinyint(1) DEFAULT NULL,
  `username` varchar(20) NOT NULL,
  `email` varchar(120) NOT NULL,
  `image_file` varchar(20) NOT NULL,
  `password` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'leo','851958789@qq.com','default.jpg','$2b$12$5rwHHsCs.fsR92YwhWaocu01XHJwy4Np9mtqFXFD0m0kgkEJRpNPq'),(2,0,'foo','foo@foo.com','default.jpg','$2b$12$aHSsRLx286SgkRSYrUd4I.tKHClZwGZsQpXAtQ3aFjD2u6SgkJ/ui');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-11 14:41:13
